'use server';

import connectToDatabase from '@/database/mongodb';
import User from '@/database/user.model';

export interface ShippingInformationInput {
  phoneNumber: string;
  address: string;
  city: string;
  stateOrProvince: string;
  zip: string;
  country: string;
}

export interface UpdatedUser {
  id: string;
  name: string;
  email: string;
  phoneNumber: string;
  address: string;
  city: string;
  stateOrProvince: string;
  zip: string;
  country: string;
}

export type UpdateUserShippingInformationResult =
  | { success: true; user: UpdatedUser }
  | { success: false; error: string };

export async function updateUserShippingInformation(
  userId: string,
  input: ShippingInformationInput,
): Promise<UpdateUserShippingInformationResult> {
  const shippingInformation: ShippingInformationInput = {
    phoneNumber: input.phoneNumber.trim(),
    address: input.address.trim(),
    city: input.city.trim(),
    stateOrProvince: input.stateOrProvince.trim(),
    zip: input.zip.trim(),
    country: input.country.trim(),
  };

  if (
    !userId ||
    !shippingInformation.phoneNumber ||
    !shippingInformation.address ||
    !shippingInformation.city ||
    !shippingInformation.stateOrProvince ||
    !shippingInformation.zip ||
    !shippingInformation.country
  ) {
    return {
      success: false,
      error: 'All shipping information fields are required.',
    };
  }

  try {
    await connectToDatabase();

    const user = await User.findByIdAndUpdate(
      userId,
      { $set: shippingInformation },
      { new: true, runValidators: true },
    );

    if (!user) {
      return {
        success: false,
        error: 'User not found.',
      };
    }

    return {
      success: true,
      user: {
        id: user._id.toString(),
        name: user.name,
        email: user.email,
        phoneNumber: user.phoneNumber ?? shippingInformation.phoneNumber,
        address: user.address ?? shippingInformation.address,
        city: user.city ?? shippingInformation.city,
        stateOrProvince: user.stateOrProvince ?? shippingInformation.stateOrProvince,
        zip: user.zip ?? shippingInformation.zip,
        country: user.country ?? shippingInformation.country,
      },
    };
  } catch (error) {
    console.error('Shipping information update error:', error);
    return {
      success: false,
      error: 'Unable to update shipping information.',
    };
  }
}
