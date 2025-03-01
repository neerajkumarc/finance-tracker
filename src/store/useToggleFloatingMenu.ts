import { create } from "zustand";

export type FloatingMenuStore = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
};

export const useFloatingMenuStore = create<FloatingMenuStore>((set) => ({
  isOpen: false,
  setIsOpen: (value: boolean) => set({ isOpen: value }),
}));
