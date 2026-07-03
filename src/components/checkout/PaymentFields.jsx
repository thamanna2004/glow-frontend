import { indianBanks, walletOptions } from "../../data/paymentOptions";
import {
  detectCardBrand,
  formatCardNumber,
  formatExpiry,
} from "../../utils/paymentHelpers";
import { CardBrandIcon } from "./PaymentIcons";

const fieldClass =
  "w-full rounded-full border border-ice-200 bg-white px-4 py-3 text-sm text-navy-900 outline-none transition focus:border-ice-400";

export default function PaymentFields({ method, values, onChange, errors = {} }) {
  const set = (field, value) => onChange({ ...values, [field]: value });

  if (method === "COD") {
    return (
      <div className="animate-[fadeIn_300ms_ease-out] rounded-[20px] border border-ice-100 bg-ice-50/50 p-5">
        <p className="text-sm text-slate-600">
          Pay in cash when your Glow Skin order is delivered. No online payment needed.
        </p>
      </div>
    );
  }

  if (method === "CARD") {
    const brand = detectCardBrand(values.cardNumber);

    return (
      <div className="animate-[fadeIn_300ms_ease-out] space-y-3">
        <div className="relative">
          <input
            className={fieldClass}
            placeholder="Card number"
            value={values.cardNumber}
            onChange={(e) => set("cardNumber", formatCardNumber(e.target.value))}
            inputMode="numeric"
            autoComplete="cc-number"
          />
          <div className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2">
            <CardBrandIcon brand={brand} />
          </div>
        </div>
        {errors.cardNumber && <p className="text-xs text-red-600">{errors.cardNumber}</p>}

        <input
          className={fieldClass}
          placeholder="Card holder name"
          value={values.cardHolder}
          onChange={(e) => set("cardHolder", e.target.value)}
          autoComplete="cc-name"
        />
        {errors.cardHolder && <p className="text-xs text-red-600">{errors.cardHolder}</p>}

        <div className="grid gap-3 sm:grid-cols-2">
          <div>
            <input
              className={fieldClass}
              placeholder="MM/YY"
              value={values.expiry}
              onChange={(e) => set("expiry", formatExpiry(e.target.value))}
              inputMode="numeric"
              autoComplete="cc-exp"
              maxLength={5}
            />
            {errors.expiry && <p className="mt-1 text-xs text-red-600">{errors.expiry}</p>}
          </div>
          <div>
            <input
              className={fieldClass}
              placeholder="CVV"
              type="password"
              value={values.cvv}
              onChange={(e) => set("cvv", e.target.value.replace(/\D/g, "").slice(0, 4))}
              inputMode="numeric"
              autoComplete="cc-csc"
              maxLength={4}
            />
            {errors.cvv && <p className="mt-1 text-xs text-red-600">{errors.cvv}</p>}
          </div>
        </div>
      </div>
    );
  }

  if (method === "UPI") {
    return (
      <div className="animate-[fadeIn_300ms_ease-out] space-y-2">
        <input
          className={fieldClass}
          placeholder="UPI ID"
          value={values.upiId}
          onChange={(e) => set("upiId", e.target.value)}
          autoComplete="off"
        />
        <p className="text-xs text-slate-500">Example: username@upi</p>
        {errors.upiId && <p className="text-xs text-red-600">{errors.upiId}</p>}
      </div>
    );
  }

  if (method === "NET_BANKING") {
    return (
      <div className="animate-[fadeIn_300ms_ease-out] space-y-2">
        <select
          className={fieldClass}
          value={values.bankName}
          onChange={(e) => set("bankName", e.target.value)}
        >
          <option value="">Select your bank</option>
          {indianBanks.map((bank) => (
            <option key={bank} value={bank}>
              {bank}
            </option>
          ))}
        </select>
        {errors.bankName && <p className="text-xs text-red-600">{errors.bankName}</p>}
      </div>
    );
  }

  if (method === "WALLET") {
    return (
      <div className="animate-[fadeIn_300ms_ease-out] space-y-3">
        <div className="grid grid-cols-2 gap-3">
          {walletOptions.map((wallet) => {
            const active = values.walletName === wallet.label;
            return (
              <button
                key={wallet.id}
                type="button"
                onClick={() => set("walletName", wallet.label)}
                className={`rounded-[18px] border px-4 py-3 text-left text-sm font-medium transition ${
                  active
                    ? "border-navy-900 bg-ice-50 text-navy-900"
                    : "border-ice-200 bg-white text-slate-600 hover:border-ice-300"
                }`}
              >
                <span
                  className="mb-2 inline-block h-2 w-2 rounded-full"
                  style={{ backgroundColor: wallet.color }}
                />
                <span className="block">{wallet.label}</span>
              </button>
            );
          })}
        </div>
        {errors.walletName && <p className="text-xs text-red-600">{errors.walletName}</p>}
      </div>
    );
  }

  return null;
}
