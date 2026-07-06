import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import Button from "../components/Button";
import ProductGallery from "../components/ProductGallery";
import ProductState from "../components/ProductState";
import useCartStore from "../store/cartStore";
import useUiStore from "../store/uiStore";
import { useRequireAuth } from "../hooks/useRequireAuth";
import { useCartAnimation } from "../hooks/useCartAnimation";
import { showToast } from "../store/toastStore";
import { useProduct } from "../hooks/useStoreProducts";

export default function ProductDetailsPage() {
  const { productId } = useParams();
  const [quantity, setQuantity] = useState(1);
  const addItem = useCartStore((state) => state.addItem);
  const openCartModal = useUiStore((state) => state.openCartModal);
  const { requireAuth } = useRequireAuth();
  const { animateAddToCart } = useCartAnimation();
  const { data: product, isLoading, isError, error } = useProduct(productId);

  if (isLoading || isError) {
    return <ProductState loading={isLoading} error={isError ? error : null} />;
  }

  const ingredientList = product?.ingredients || [
    "Botanical Extract Blend",
    "Hyaluronic Complex",
    "Green Tea Antioxidants",
  ];
  const benefitsList = product?.benefits || [
    "Nourishes and hydrates deeply",
    "Supports smooth skin texture",
    "Enhances natural glow",
  ];

  if (!product) {
    return (
      <div className="glass-panel rounded-[28px] p-10 text-center">
        <h1 className="display-heading text-5xl text-forest">Product not found</h1>
        <Link to="/shop" className="mt-5 inline-block text-sm text-slate-600 underline">
          Return to shop
        </Link>
      </div>
    );
  }

  const handleAddToCart = () => {
    const el = document.getElementById("pdp-main-image");
    requireAuth(
      () => {
        animateAddToCart(product, el);
        addItem(product, quantity);
        openCartModal(product, quantity);
        showToast("✓ Added to your cart");
      },
      { pendingAction: { type: "ADD_TO_CART", product, quantity } }
    );
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="space-y-10 pb-10"
    >
      <div className="grid gap-8 lg:grid-cols-2">
        <div id="pdp-main-image">
          <ProductGallery product={product} />
        </div>

        <div className="glass-panel rounded-[28px] p-7 md:p-10">
          <p className="section-overline">{product.category}</p>
          <h1 className="display-heading mt-3 text-4xl text-forest md:text-5xl">{product.name}</h1>
          <p className="mt-2 text-sm text-gold">★ {product.rating} / 5</p>
          <p className="mt-4 text-sm leading-relaxed text-slate-600">
            {product.description || product.shortDescription}
          </p>
          <p className="mt-5 text-3xl font-semibold text-forest">
            ₹{product.salePrice ?? product.price}
            {product.discount > 0 && (
              <span className="ml-3 text-lg text-slate-400 line-through">₹{product.price}</span>
            )}
          </p>

          <div className="mt-7">
            <label htmlFor="qty" className="mb-2 block text-sm text-slate-600">
              Quantity
            </label>
            <input
              id="qty"
              type="number"
              min={1}
              value={quantity}
              onChange={(event) => setQuantity(Math.max(1, Number(event.target.value) || 1))}
              className="premium-input w-24"
            />
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <Button className="btn-ripple" onClick={handleAddToCart}>
              Add to Cart
            </Button>
            <Link to="/checkout">
              <Button variant="outline">Buy Now</Button>
            </Link>
          </div>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <article className="glass-panel rounded-[24px] p-6">
          <h2 className="display-heading text-3xl text-forest">Ingredients</h2>
          <ul className="mt-4 space-y-2 text-sm text-slate-600">
            {ingredientList.map((ingredient) => (
              <li key={ingredient}>• {ingredient}</li>
            ))}
          </ul>
        </article>
        <article className="glass-panel rounded-[24px] p-6">
          <h2 className="display-heading text-3xl text-forest">Benefits</h2>
          <ul className="mt-4 space-y-2 text-sm text-slate-600">
            {benefitsList.map((benefit) => (
              <li key={benefit}>• {benefit}</li>
            ))}
          </ul>
        </article>
      </div>
    </motion.section>
  );
}
