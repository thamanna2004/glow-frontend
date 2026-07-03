import ProductImage from "../ProductImage";
import { formatPrice } from "../../utils/helpers";
import { getCartDiscountTotal } from "../../utils/paymentHelpers";

export default function OrderSummary({ items, subtotal, shipping, discount }) {
  const total = subtotal + shipping;

  return (
    <aside className="rounded-[24px] border border-ice-200/50 glass-panel p-6 lg:sticky lg:top-28">
      <h2 className="display-heading text-4xl text-navy-900">Order Summary</h2>

      <div className="mt-5 max-h-[320px] space-y-4 overflow-y-auto pr-1">
        {items.map((item) => (
          <div key={item.id} className="flex gap-3">
            <ProductImage
              product={item}
              className="h-16 w-16 shrink-0"
              roundedClass="rounded-xl"
            />
            <div className="min-w-0 flex-1">
              <p className="truncate font-medium text-navy-900">{item.name}</p>
              <p className="text-xs text-slate-500">Qty: {item.quantity}</p>
              <p className="mt-1 text-sm font-medium text-navy-900">
                {formatPrice(item.price * item.quantity)}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-5 space-y-2 border-t border-ice-100 pt-4 text-sm text-slate-600">
        <p className="flex justify-between">
          <span>Subtotal</span>
          <span>{formatPrice(subtotal + discount)}</span>
        </p>
        {discount > 0 && (
          <p className="flex justify-between text-emerald-700">
            <span>Discount</span>
            <span>-{formatPrice(discount)}</span>
          </p>
        )}
        <p className="flex justify-between">
          <span>Shipping</span>
          <span>{formatPrice(shipping)}</span>
        </p>
        <p className="flex justify-between border-t border-ice-200 pt-3 text-base font-semibold text-navy-900">
          <span>Total</span>
          <span>{formatPrice(total)}</span>
        </p>
      </div>
    </aside>
  );
}

export { getCartDiscountTotal };
