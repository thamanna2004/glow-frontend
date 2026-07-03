import { useState } from "react";
import { Link } from "react-router-dom";
import Button from "../components/Button";
import OrderSummary, { getCartDiscountTotal } from "../components/checkout/OrderSummary";
import PaymentFields from "../components/checkout/PaymentFields";
import PaymentMethodSelector from "../components/checkout/PaymentMethodSelector";
import SecurePaymentBadge from "../components/checkout/SecurePaymentBadge";
import { createOrder } from "../features/orders/api/orderApi";
import useUiStore from "../store/uiStore";
import { useAuth } from "../features/auth/hooks/useAuth";
import useCartStore from "../store/cartStore";
import { indianStates } from "../data/indianStates";
import { formatPrice } from "../utils/helpers";
import { getProductImageUrl } from "../utils/productNormalizer";
import {
  detectCardBrand,
  validateCardNumber,
  validateCvv,
  validateExpiry,
} from "../utils/paymentHelpers";

const fieldClass = "premium-input text-forest";

const emptyShipping = {
  firstName: "",
  lastName: "",
  email: "",
  address: "",
  city: "",
  state: "",
  pinCode: "",
};

const emptyPayment = {
  cardNumber: "",
  cardHolder: "",
  expiry: "",
  cvv: "",
  upiId: "",
  bankName: "",
  walletName: "",
};

function validatePayment(method, payment) {
  const errors = {};

  if (method === "CARD") {
    const brand = detectCardBrand(payment.cardNumber);
    if (!validateCardNumber(payment.cardNumber)) {
      errors.cardNumber = "Enter a valid card number";
    }
    if (!payment.cardHolder.trim()) {
      errors.cardHolder = "Card holder name is required";
    }
    if (!validateExpiry(payment.expiry)) {
      errors.expiry = "Enter a valid expiry (MM/YY)";
    }
    if (!validateCvv(payment.cvv, brand)) {
      errors.cvv = "Enter a valid CVV";
    }
  }

  if (method === "UPI") {
    const upi = payment.upiId.trim();
    if (!/^[\w.-]+@[\w.-]+$/.test(upi)) {
      errors.upiId = "Enter a valid UPI ID (e.g. username@upi)";
    }
  }

  if (method === "NET_BANKING" && !payment.bankName) {
    errors.bankName = "Please select a bank";
  }

  if (method === "WALLET" && !payment.walletName) {
    errors.walletName = "Please select a wallet";
  }

  return errors;
}

export default function CheckoutPage() {
  const { user } = useAuth();
  const items = useCartStore((state) => state.items);
  const clearCart = useCartStore((state) => state.clearCart);
  const showLoadingScreen = useUiStore((state) => state.showLoadingScreen);
  const hideLoadingScreen = useUiStore((state) => state.hideLoadingScreen);
  const openOrderSuccess = useUiStore((state) => state.openOrderSuccess);
  const subtotal = useCartStore((state) => state.getSubtotal());
  const shipping = useCartStore((state) => state.getShippingFee());
  const discount = getCartDiscountTotal(items);
  const total = subtotal + shipping;

  const [shippingForm, setShippingForm] = useState({
    ...emptyShipping,
    email: user?.email || "",
    firstName: user?.name?.split(" ")[0] || "",
    lastName: user?.name?.split(" ").slice(1).join(" ") || "",
  });
  const [paymentMethod, setPaymentMethod] = useState("COD");
  const [paymentForm, setPaymentForm] = useState(emptyPayment);
  const [paymentErrors, setPaymentErrors] = useState({});
  const [formError, setFormError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const setShipping = (field, value) =>
    setShippingForm((prev) => ({ ...prev, [field]: value }));

  const handleSubmit = async (event) => {
    event.preventDefault();
    setFormError("");
    setPaymentErrors({});

    if (!items.length) {
      setFormError("Your cart is empty.");
      return;
    }

    const requiredShipping = ["firstName", "lastName", "email", "address", "city", "state", "pinCode"];
    for (const field of requiredShipping) {
      if (!shippingForm[field]?.trim()) {
        setFormError("Please complete all shipping details.");
        return;
      }
    }

    const errors = validatePayment(paymentMethod, paymentForm);
    if (Object.keys(errors).length) {
      setPaymentErrors(errors);
      setFormError("Please fix payment details before placing your order.");
      return;
    }

    setSubmitting(true);
    showLoadingScreen("Placing your order...");

    try {
      const brand = detectCardBrand(paymentForm.cardNumber);

      await createOrder({
        items: items.map((item) => ({
          productId: item._id || item.id,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          imageUrl: getProductImageUrl(item) || "",
        })),
        shippingAddress: shippingForm,
        paymentMethod,
        paymentDetails: {
          cardNumber: paymentForm.cardNumber,
          cardBrand: brand,
          cardHolder: paymentForm.cardHolder,
          upiId: paymentForm.upiId,
          bankName: paymentForm.bankName,
          walletName: paymentForm.walletName,
        },
        subtotal,
        discount,
        shippingFee: shipping,
        totalAmount: total,
      });

      clearCart();
      openOrderSuccess();
    } catch (error) {
      setFormError(error.message || "Unable to place order. Please try again.");
    } finally {
      setSubmitting(false);
      hideLoadingScreen();
    }
  };

  if (!items.length) {
    return (
      <section className="pb-10">
        <h1 className="display-heading text-5xl text-navy-900 md:text-6xl">Checkout</h1>
        <div className="mt-8 rounded-[24px] glass-panel p-10 text-center">
          <p className="text-slate-600">Your cart is empty.</p>
          <Link to="/shop" className="mt-4 inline-block text-navy-900 underline">
            Continue shopping
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="pb-10">
      <h1 className="display-heading text-5xl text-navy-900 md:text-6xl">Checkout</h1>

      <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_380px]">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4 rounded-[24px] border border-ice-200/50 glass-panel p-6">
            <h2 className="display-heading text-4xl text-navy-900">Shipping details</h2>
            <div className="grid gap-3 md:grid-cols-2">
              <input
                className={fieldClass}
                placeholder="First name"
                value={shippingForm.firstName}
                onChange={(e) => setShipping("firstName", e.target.value)}
                required
              />
              <input
                className={fieldClass}
                placeholder="Last name"
                value={shippingForm.lastName}
                onChange={(e) => setShipping("lastName", e.target.value)}
                required
              />
            </div>
            <input
              className={fieldClass}
              type="email"
              placeholder="Email"
              value={shippingForm.email}
              onChange={(e) => setShipping("email", e.target.value)}
              required
            />
            <input
              className={fieldClass}
              placeholder="Address"
              value={shippingForm.address}
              onChange={(e) => setShipping("address", e.target.value)}
              required
            />
            <div className="grid gap-3 md:grid-cols-3">
              <input
                className={fieldClass}
                placeholder="City"
                value={shippingForm.city}
                onChange={(e) => setShipping("city", e.target.value)}
                required
              />
              <select
                className={fieldClass}
                value={shippingForm.state}
                onChange={(e) => setShipping("state", e.target.value)}
                required
              >
                <option value="">Select state</option>
                {indianStates.map((name) => (
                  <option key={name} value={name}>
                    {name}
                  </option>
                ))}
              </select>
              <input
                className={fieldClass}
                placeholder="PIN code"
                value={shippingForm.pinCode}
                onChange={(e) => setShipping("pinCode", e.target.value.replace(/\D/g, "").slice(0, 6))}
                inputMode="numeric"
                maxLength={6}
                required
              />
            </div>
          </div>

          <div className="space-y-5 rounded-[24px] border border-ice-200/50 glass-panel p-6">
            <div>
              <h2 className="display-heading text-4xl text-navy-900">Payment</h2>
              <p className="mt-1 text-sm text-slate-500">
                Choose how you would like to pay · Total {formatPrice(total)}
              </p>
            </div>

            <PaymentMethodSelector
              selected={paymentMethod}
              onChange={(method) => {
                setPaymentMethod(method);
                setPaymentErrors({});
              }}
            />

            <div className="overflow-hidden transition-all duration-300">
              <PaymentFields
                method={paymentMethod}
                values={paymentForm}
                onChange={setPaymentForm}
                errors={paymentErrors}
              />
            </div>

            <SecurePaymentBadge />

            {formError && <p className="text-sm text-red-600">{formError}</p>}

            <Button type="submit" className="w-full" disabled={submitting}>
              {submitting ? "Placing order..." : "Place Order"}
            </Button>
          </div>
        </form>

        <OrderSummary
          items={items}
          subtotal={subtotal}
          shipping={shipping}
          discount={discount}
        />
      </div>
    </section>
  );
}
