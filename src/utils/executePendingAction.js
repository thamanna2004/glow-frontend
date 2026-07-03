import useCartStore from "../store/cartStore";
import useWishlistStore from "../store/wishlistStore";
import useUiStore from "../store/uiStore";
import { showToast } from "../store/toastStore";

export function executePendingAction(action) {
  if (!action?.type) return;

  const ui = useUiStore.getState();

  switch (action.type) {
    case "ADD_TO_CART": {
      const { product, quantity = 1 } = action;
      useCartStore.getState().addItem(product, quantity);
      ui.openCartModal(product, quantity);
      showToast("✓ Added to your cart");
      break;
    }
    case "ADD_TO_WISHLIST": {
      const { product } = action;
      useWishlistStore.getState().addItem(product);
      ui.openWishlistModal(product);
      showToast("♡ Added to wishlist");
      break;
    }
    default:
      break;
  }
}
