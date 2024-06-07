import { create } from "zustand";
import { persist } from "zustand/middleware"; // For persistence

interface LayoutState {
  layoutType: "sidebar" | "navbar";
  setLayoutType: (type: "sidebar" | "navbar") => void;
}

const useLayoutStore = create(
  persist<LayoutState>(
    (set) => ({
      layoutType: "sidebar", // Default value
      setLayoutType: (type) => set(() => ({ layoutType: type })),
    }),
    {
      name: "layout-storage", // Unique name for storage
    }
  )
);

export default useLayoutStore;
