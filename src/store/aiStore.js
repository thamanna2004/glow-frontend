import { create } from "zustand";
import { persist } from "zustand/middleware";

const useAiStore = create(
  persist(
    (set) => ({
      open: false,
      messages: [],
      setOpen: (open) => set({ open }),
      toggle: () => set((s) => ({ open: !s.open })),
      addMessage: (message) =>
        set((s) => ({ messages: [...s.messages, message] })),
      clearMessages: () => set({ messages: [] }),
    }),
    {
      name: "glow-ai-chat",
      partialize: (state) => ({ messages: state.messages }),
    }
  )
);

export default useAiStore;
