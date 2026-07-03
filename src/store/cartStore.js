import { create } from "zustand";

import { getProductUnitPrice } from "../utils/helpers";

const SHIPPING_FEE = 99;

const useCartStore = create((set, get) => ({
  items: [],
  addItem: (product, quantity = 1) =>
    set((state) => {
      const unitPrice = getProductUnitPrice(product);
      const cartProduct = { ...product, price: unitPrice };
      const existing = state.items.find((item) => item.id === product.id);
      if (existing) {
        return {
          items: state.items.map((item) =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + quantity, price: unitPrice }
              : item
          ),
        };
      }
      return {
        items: [...state.items, { ...cartProduct, quantity }],
      };
    }),
  removeItem: (productId) =>
    set((state) => ({
      items: state.items.filter((item) => item.id !== productId),
    })),
  setQuantity: (productId, quantity) =>
    set((state) => ({
      items: state.items.map((item) =>
        item.id === productId
          ? { ...item, quantity: Math.max(1, Number(quantity) || 1) }
          : item
      ),
    })),
  clearCart: () => set({ items: [] }),
  getSubtotal: () =>
    get().items.reduce((total, item) => total + item.price * item.quantity, 0),

  getItemCount: () =>
    get().items.reduce((count, item) => count + item.quantity, 0),

  getShippingFee: () => SHIPPING_FEE,
}));

export default useCartStore;
