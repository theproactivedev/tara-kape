'use server';

import bcrypt from 'bcryptjs';

import connectToDatabase from '@/database/mongodb';
import User from '@/database/user.model';

export interface RegisterInput {
  name: string;
  email: string;
  password: string;
}

export type RegisterResult =
  | { success: true; user: { id: string; name: string; email: string } }
  | { success: false; error: string };

export async function registerUser(input: RegisterInput): Promise<RegisterResult> {
  const name = input.name.trim();
  const email = input.email.trim().toLowerCase();

  if (!name || !email || !input.password) {
    return { success: false, error: 'Name, email, and password are required' };
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { success: false, error: 'Invalid email address' };
  }

  if (input.password.length < 8) {
    return { success: false, error: 'Password must be at least 8 characters' };
  }

  try {
    await connectToDatabase();

    const existing = await User.findOne({ email });
    if (existing) {
      return { success: false, error: 'Email already in use' };
    }

    const passwordHash = await bcrypt.hash(input.password, 10);
    const user = await User.create({ name, email, passwordHash });

    return {
      success: true,
      user: { id: user._id.toString(), name: user.name, email: user.email },
    };
  } catch (error) {
    console.error('Registration error:', error);
    return { success: false, error: 'Unable to create your account' };
  }
}