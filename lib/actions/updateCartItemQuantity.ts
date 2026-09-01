'use server';

import connectToDatabase from '@/database/mongodb';
import Cart, { CartDocument } from '@/database/cart.model';
import Product from '@/database/product.model';

export type UpdateCartItemQuantityResult =
  | { success: true }
  | { success: false; error: string };

export async function updateCartItemQuantity(
  userId: string,
  productId: string,
  delta: 1 | -1,
): Promise<UpdateCartItemQuantityResult> {
  try {
    if (!userId || !productId) {
      return {
        success: false,
        error: 'User and product are required.',
      };
    }

    if (delta !== 1 && delta !== -1) {
      return {
        success: false,
        error: 'Quantity change must be +1 or -1.',
      };
    }

    await connectToDatabase();

    const product = await Product.findById(productId);

    if (!product) {
      return {
        success: false,
        error: 'Product not found.',
      };
    }

    const cart: CartDocument | null = await Cart.findOne({ user: userId });

    if (!cart) {
      return {
        success: false,
        error: 'Cart not found.',
      };
    }

    const existingItem = cart.items.find((item) => item.product.toString() === productId);

    if (!existingItem) {
      return {
        success: false,
        error: 'Item not found in cart.',
      };
    }

    const nextQuantity = existingItem.quantity + delta;

    if (nextQuantity <= 0) {
      cart.items = cart.items.filter((item) => item.product.toString() !== productId);
    } else {
      existingItem.quantity = nextQuantity;
    }

    await cart.save();

    return { success: true };
  } catch (error) {
    return {
      success: false,
      error: 'Unable to update cart quantity.',
    };
  }
}
