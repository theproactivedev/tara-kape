'use server';

import connectToDatabase from '@/database/mongodb';
import Product, { IProduct } from '@/database/product.model';

export interface ProductWithId extends IProduct {
  id: string;
}

export interface GetAllProducts {
  success: boolean;
  products?: ProductWithId[];
  error?: string
}

export async function getAllProducts(): Promise<GetAllProducts> {
  try {
    await connectToDatabase();

    const products = await Product.find({}).lean();
    const productsWithId = products.map((product) => {
      const { _id, ...rest } = product;
      return {
        ...rest,
        id: _id.toString(),
      } as ProductWithId;
    });

    return {
      success: true,
      products: productsWithId,
    };
  } catch (error) {
    console.error('Error fetching products:', error);
    return { success: false, error: 'Unable to get products' };
  }
}
