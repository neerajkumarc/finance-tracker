import { create } from "zustand";

export type AddingStore = {
  isAdding: boolean;
  setIsAdding: (isAdding: boolean) => void;
};

export const useAddingStore = create<AddingStore>((set) => ({
  isAdding: false,
  setIsAdding: (value: boolean) => set({ isAdding: value }),
}));
