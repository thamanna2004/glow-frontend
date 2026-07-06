import { Link } from "react-router-dom";
import useWishlistStore from "../store/wishlistStore";
import useCartStore from "../store/cartStore";
import useUiStore from "../store/uiStore";
import { useRequireAuth } from "../hooks/useRequireAuth";
import { showToast } from "../store/toastStore";
import ProductImage from "../components/ProductImage";
import Button from "../components/Button";
import { formatPrice } from "../utils/helpers";

export default function WishlistPage() {
  const items = useWishlistStore((state) => state.items);
  const removeItem = useWishlistStore((state) => state.removeItem);
  const addToCart = useCartStore((state) => state.addItem);
  const openCartModal = useUiStore((state) => state.openCartModal);
  const { requireAuth } = useRequireAuth();

  const handleAddToCart = (item) => {
    requireAuth(
      () => {
        addToCart(item);
        openCartModal(item, 1);
        showToast("✓ Added to your cart");
      },
      { pendingAction: { type: "ADD_TO_CART", product: item, quantity: 1 } }
    );
  };

  return (
    <section className="space-y-8 pb-10">
        <header className="rounded-[26px] glass-panel p-8">
          <p className="section-overline">Saved Rituals</p>
          <h1 className="display-heading mt-2 text-5xl text-navy-900 md:text-6xl">Wishlist</h1>
          <p className="mt-3 text-sm text-slate-600">
            Your favorite skincare picks, ready whenever you are.
          </p>
        </header>

        {items.length === 0 ? (
          <div className="rounded-[24px] glass-panel p-10 text-center">
            <p className="text-sm text-slate-600">Your wishlist is empty.</p>
            <Link to="/shop" className="mt-5 inline-block">
              <Button>Explore Products</Button>
            </Link>
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((item) => (
              <article
                key={item.id}
                className="overflow-hidden rounded-[24px] border border-ice-200/60 bg-white"
              >
                <ProductImage
                  product={item}
                  className="aspect-[4/3] w-full"
                  roundedClass="rounded-t-[24px]"
                />
                <div className="p-5">
                  <h2 className="display-heading text-2xl text-navy-900">{item.name}</h2>
                  <p className="mt-1 text-sm text-slate-500">{formatPrice(item.salePrice ?? item.price)}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    <Button onClick={() => handleAddToCart(item)}>Add to Cart</Button>
                    <Link to={`/products/${item.id}`}>
                      <Button variant="outline">View</Button>
                    </Link>
                    <Button variant="soft" onClick={() => removeItem(item.id)}>
                      Remove
                    </Button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
  );
}
