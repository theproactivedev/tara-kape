'use server';

import connectToDatabase from '@/database/mongodb';
import Cart from '@/database/cart.model';

export type ClearCartResult =
  | { success: true }
  | { success: false; error: string };

export async function clearCartForUser(
  userId: string,
  expectedUpdatedAt?: Date,
): Promise<ClearCartResult> {
  try {
    if (!userId) {
      return { success: false, error: 'User ID is required.' };
    }

    await connectToDatabase();

    const filter: { user: string; updatedAt?: Date } = { user: userId };
    if (expectedUpdatedAt) {
      filter.updatedAt = expectedUpdatedAt;
    }

    const result = await Cart.updateOne(filter, { $set: { items: [] } });

    if (result.matchedCount === 0) {
      return {
        success: false,
        error: expectedUpdatedAt
          ? 'Cart changed before it could be cleared.'
          : 'Cart not found.',
      };
    }

    return { success: true };
  } catch(error) {
    console.error('Error clearing cart:', error);
    return { success: false, error: 'An error occurred while clearing the cart.' };
  }
}
