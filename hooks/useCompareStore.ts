import {create} from "zustand";
import { persist } from "zustand/middleware";

interface CompareProduct {
  productId: number;
  name: string;
  description: string;
  price: number;
  discount:number
  images: { url: string }[];
  specifications: string[];
}

interface CompareState {
  items: CompareProduct[];
  addToCompare: (product: CompareProduct) => void;
  removeFromCompare: (productId: number) => void;
  clearCompare: () => void;
}

const useCompareStore = create(
  persist<CompareState>(
    (set) => ({
      items: [],
      addToCompare: (product) =>
        set((state) => ({
          items: [...state.items, product],
        })),
      removeFromCompare: (productId) =>
        set((state) => ({
          items: state.items.filter((item) => item.productId !== productId),
        })),
      clearCompare: () => set({ items: [] }),
    }),
    {
      name: "compare-storage", // Key for local storage
      getStorage: () => localStorage, // Use localStorage
    }
  )
);

export default useCompareStore;
