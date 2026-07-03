import { Link } from "react-router-dom";
import Button from "../components/Button";
import ProductImage from "../components/ProductImage";
import useCartStore from "../store/cartStore";
import { formatPrice } from "../utils/helpers";

export default function CartPage() {
  const items = useCartStore((state) => state.items);
  const removeItem = useCartStore((state) => state.removeItem);
  const setQuantity = useCartStore((state) => state.setQuantity);
  const subtotal = useCartStore((state) => state.getSubtotal());
  const shipping = useCartStore((state) => state.getShippingFee());

  return (
    <section className="pb-10">
      <h1 className="display-heading text-5xl text-navy-900 md:text-6xl">Your Cart</h1>

      {!items.length ? (
        <div className="mt-8 rounded-[24px] glass-panel p-10 text-center">
          <p className="text-slate-600">Your cart is empty.</p>
          <Link to="/shop" className="mt-4 inline-block text-navy-900 underline">
            Continue shopping
          </Link>
        </div>
      ) : (
        <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_360px]">
          <div className="space-y-4">
            {items.map((item) => (
              <article
                key={item.id}
                className="flex flex-col gap-4 rounded-[24px] border border-ice-200/50 glass-panel p-5 sm:flex-row"
              >
                <ProductImage
                  product={item}
                  className="h-32 w-32 shrink-0"
                  roundedClass="rounded-2xl"
                />
                <div className="flex-1">
                  <h2 className="display-heading text-3xl text-navy-900">{item.name}</h2>
                  <p className="text-sm text-slate-600">{formatPrice(item.price)}</p>
                  <div className="mt-3 flex items-center gap-3">
                    <input
                      type="number"
                      min={1}
                      value={item.quantity}
                      onChange={(event) => setQuantity(item.id, event.target.value)}
                      className="w-20 rounded-full border border-ice-200 px-3 py-1 text-sm"
                    />
                    <button
                      type="button"
                      onClick={() => removeItem(item.id)}
                      className="text-sm text-slate-600 underline"
                    >
                      Remove
                    </button>
                  </div>
                </div>
                <p className="text-lg font-semibold text-navy-900">
                  {formatPrice(item.price * item.quantity)}
                </p>
              </article>
            ))}
          </div>

          <aside className="rounded-[24px] border border-ice-200/50 glass-panel p-6">
            <h2 className="display-heading text-4xl text-navy-900">Order Summary</h2>
            <div className="mt-5 space-y-2 text-sm text-slate-600">
              <p className="flex justify-between">
                <span>Subtotal</span>
                <span>{formatPrice(subtotal)}</span>
              </p>
              <p className="flex justify-between">
                <span>Shipping</span>
                <span>{formatPrice(shipping)}</span>
              </p>
              <p className="flex justify-between border-t border-ice-200 pt-2 text-base font-semibold text-navy-900">
                <span>Total</span>
                <span>{formatPrice(subtotal + shipping)}</span>
              </p>
            </div>
            <Link to="/checkout" className="mt-6 block">
              <Button className="w-full">Checkout</Button>
            </Link>
          </aside>
        </div>
      )}
    </section>
  );
}
