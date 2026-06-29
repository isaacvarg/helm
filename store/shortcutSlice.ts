import { create } from "zustand";

interface ShortcutState {
  active: boolean;
  showIndicators: boolean;
  kbdSize: string;
  actions: {
    enter: () => void;
    exit: () => void;
    toggle: () => void;
    setShowIndicators: (v: boolean) => void;
    setKbdSize: (v: string) => void;
  };
}

export const useShortcut = create<ShortcutState>((set) => ({
  active: false,
  showIndicators: true,
  kbdSize: "sm",
  actions: {
    enter: () => set({ active: true }),
    exit: () => set({ active: false }),
    toggle: () => set((s) => ({ active: !s.active })),
    setShowIndicators: (v) => set({ showIndicators: v }),
    setKbdSize: (v) => set({ kbdSize: v }),
  },
}));

export const useShortcutActions = () => useShortcut((s) => s.actions);
