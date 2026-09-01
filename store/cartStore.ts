'use client';

import { create } from 'zustand';
import { ICartPopulated } from '@/database/cart.model';
import { getCart } from '@/lib/actions/getCart';

const defaultCart: ICartPopulated = {
  user: '',
  items: [],
};

type CartStore = {
  cart: ICartPopulated;
  setCart: (cart: ICartPopulated) => void;
  refreshCart: (userId?: string) => Promise<void>;
  clearCart: () => void;
};

export const useCartStore = create<CartStore>((set) => ({
  cart: defaultCart,
  setCart: (cart) => set({ cart }),
  refreshCart: async (userId?: string) => {
    if (!userId) {
      set({ cart: defaultCart });
      return;
    }

    const result = await getCart(userId);

    if (result.success) {
      set({ cart: result.cart });
    }
  },
  clearCart: () => set({ cart: defaultCart }),
}));
