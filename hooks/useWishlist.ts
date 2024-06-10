"use client";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface WishlistProduct {
  productId: number;
  name: string;
  price: number;
  image: string;
  color: string | null;
  size: string | null;
}

interface WishlistState {
  items: WishlistProduct[];
  addToWishlist: (product: WishlistProduct) => void;
  removeFromWishlist: (productId: number) => void;
  clearWishlist: () => void;
}

const useWishlistStore = create(
  persist<WishlistState>(
    (set) => ({
      items: [],
      addToWishlist: (product) =>
        set((state) => ({
          items: [...state.items, product],
        })),
      removeFromWishlist: (productId) =>
        set((state) => ({
          items: state.items.filter((item) => item.productId !== productId),
        })),
      clearWishlist: () => set({ items: [] }),
    }),
    {
      name: "wishlist-storage", // Key for local storage
      getStorage: () => localStorage, // Use localStorage
    }
  )
);

export default useWishlistStore;
