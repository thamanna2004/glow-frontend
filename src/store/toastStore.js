import { create } from "zustand";

const useToastStore = create((set, get) => ({
  toasts: [],

  addToast: (message, type = "success") => {
    const id = `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
    set((state) => ({
      toasts: [...state.toasts, { id, message, type }],
    }));

    setTimeout(() => {
      get().removeToast(id);
    }, 3800);

    return id;
  },

  removeToast: (id) =>
    set((state) => ({
      toasts: state.toasts.filter((toast) => toast.id !== id),
    })),
}));

export function showToast(message, type = "success") {
  return useToastStore.getState().addToast(message, type);
}

export default useToastStore;
