import useUiStore from "../store/uiStore";
import { getProductImageUrl } from "../utils/productNormalizer";

export function useCartAnimation() {
  const triggerFlyToCart = useUiStore((s) => s.triggerFlyToCart);
  const pulseCartBadge = useUiStore((s) => s.pulseCartBadge);

  const animateAddToCart = (product, sourceEl) => {
    const rect = sourceEl?.getBoundingClientRect?.();
    const imageUrl = getProductImageUrl(product);

    if (rect && imageUrl) {
      triggerFlyToCart({
        id: `${product.id}-${Date.now()}`,
        imageUrl,
        from: { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 },
      });
    }
    pulseCartBadge();
  };

  return { animateAddToCart };
}
