import { create } from "zustand";
import { persist } from "zustand/middleware";

const useWishlistStore = create(
  persist(
    (set, get) => ({
      items: [],

      addItem: (product) => {
        const exists = get().items.some((item) => item.id === product.id);
        if (exists) return;
        set({ items: [...get().items, product] });
      },

      removeItem: (productId) =>
        set({ items: get().items.filter((item) => item.id !== productId) }),

      isInWishlist: (productId) => get().items.some((item) => item.id === productId),

      clear: () => set({ items: [] }),
    }),
    { name: "glowy-wishlist" }
  )
);

export default useWishlistStore;
