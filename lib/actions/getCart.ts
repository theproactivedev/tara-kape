'use server';

import connectToDatabase from '@/database/mongodb';
import Cart, { ICartPopulated } from '@/database/cart.model';

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

    const cart = await Cart.findOne({ user: userId }).populate('items.product').lean();
    const plainCart = JSON.parse(JSON.stringify(cart));
    const processedCart: ICartPopulated = cart
      ? {
          user: userId,
          items: plainCart.items,
        }
      : { user: userId, items: [] };

    return {
      success: true,
      cart: processedCart,
    };
  } catch (error) {
    console.error('Error fetching cart:', error);
    return {
      success: false,
      error: 'Unable to get cart',
    };
  }
}
