import create from "zustand";

export const useAuthStore = create((set) => ({
  successMessage: "",
  setSuccessMessage: (message) => set({ successMessage: message }),
  clearSuccessMessage: () => set({ successMessage: "" }),
}));
