'use server';

import connectToDatabase from '@/database/mongodb';
import User, { UserDocument } from '@/database/user.model';

export type GetUserResult =
  | { success: true; user: UserDocument }
  | { success: false; error: string };

export async function getUser(userId: string): Promise<GetUserResult> {
  try {
    if (!userId) {
      return {
        success: false,
        error: 'User ID is required',
      };
    }

    await connectToDatabase();

    const user = await User.findOne({ _id: userId }).lean();
    const plainUser = JSON.parse(JSON.stringify(user));

    return {
      success: true,
      user: plainUser,
    };
  } catch (error) {
    console.error('Error fetching user:', error);
    return {
      success: false,
      error: 'Unable to get user',
    };
  }
}
