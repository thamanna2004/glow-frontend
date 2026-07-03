import { create } from "zustand";

const useUiStore = create((set) => ({
  authModalOpen: false,
  authModalTab: "login",
  authModalReturnPath: null,
  pendingAction: null,

  openAuthModal: (options = {}) =>
    set({
      authModalOpen: true,
      authModalTab: options.tab || "login",
      authModalReturnPath: options.returnPath ?? null,
      pendingAction: options.pendingAction ?? null,
    }),

  closeAuthModal: () =>
    set({
      authModalOpen: false,
      authModalReturnPath: null,
      pendingAction: null,
    }),

  setAuthModalTab: (tab) => set({ authModalTab: tab }),

  wishlistModalProduct: null,
  openWishlistModal: (product) => set({ wishlistModalProduct: product }),
  closeWishlistModal: () => set({ wishlistModalProduct: null }),

  cartModalData: null,
  openCartModal: (product, quantity = 1) =>
    set({ cartModalData: { product, quantity } }),
  closeCartModal: () => set({ cartModalData: null }),

  loadingScreen: { visible: false, message: "Creating your glow..." },
  showLoadingScreen: (message = "Creating your glow...") =>
    set({ loadingScreen: { visible: true, message } }),
  hideLoadingScreen: () =>
    set({ loadingScreen: { visible: false, message: "" } }),

  orderSuccessOpen: false,
  openOrderSuccess: () => set({ orderSuccessOpen: true }),
  closeOrderSuccess: () => set({ orderSuccessOpen: false }),

  introReady: false,
  setIntroReady: () => set({ introReady: true }),

  flyToCart: null,
  triggerFlyToCart: (data) => set({ flyToCart: data }),
  clearFlyToCart: () => set({ flyToCart: null }),

  cartPulseKey: 0,
  pulseCartBadge: () => set((s) => ({ cartPulseKey: s.cartPulseKey + 1 })),

  quickViewProduct: null,
  openQuickView: (product) => set({ quickViewProduct: product }),
  closeQuickView: () => set({ quickViewProduct: null }),
}));

export default useUiStore;
