import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import Product from "@/models/product.model";

interface CartStore {
  items: typeof Product | null;
  addItem: (data: typeof Product) => void;
  removeAll: () => void;
  removeItem: (id: string) => void;
}

const useCart = create(
  persist<CartStore>(
    (set, get) => ({
      items: null,

      addItem: (data: typeof Product) => {
        set({ items: data });
      },

      removeItem: (id: string) => {
        const items = get().items || null;
        // @ts-ignore
        const newItems = items?.products?.filter((item) => item._id !== id);

        set({ items: newItems });
      },

      removeAll: () => set({ items: null }),
    }),

    {
      name: "cart-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useCart;
