'use server';

import connectToDatabase from '@/database/mongodb';
import Cart, { ICart, ICartItem, ICartPopulated } from '@/database/cart.model';

export type GetCartResult =
  | { success: true; cart: ICartPopulated }
  | { success: false; error: string };

export async function getCart(userId: string): Promise<GetCartResult> {
  try {
    if (!userId) {
      return {
        success: false,
        error: 'User ID is required',
      };
    }

    await connectToDatabase();

    const cart: ICartPopulated = await Cart.findOne({ user: userId }).populate('items.product').lean();
    const processedCart = {
      user: userId,
      items: cart.items
    };

    return {
      success: true,
      cart: cart ? processedCart : { user: userId, items: [] },
    };
  } catch (error) {
    console.error('Error fetching cart:', error);
    return {
      success: false,
      error: 'Unable to get cart',
    };
  }
}
