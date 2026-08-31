'use server';

import connectToDatabase from '@/database/mongodb';
import Cart, { CartDocument, ICart, ICartItem } from '@/database/cart.model';
import Product from '@/database/product.model';


export async function addToCart(userId: string, productId: string, quantity = 1) {
  try {
    await connectToDatabase();

    const product = await Product.findById(productId);

    if (!product) {
      return {
        success: false,
        error: 'Product not found'
      };
    }

    let cart: CartDocument | null = await Cart.findOne({ user: userId });

    if (!cart) {
      cart = await Cart.create({
        user: userId,
        items: [{ product: product._id, quantity, priceAtAdd: product.price }],
      }) as CartDocument;

      return {
        success: true
      };
    }

    const existingItem = cart.items.find((item) => item.product.toString() === productId);

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.items.push({
        product: product._id,
        quantity,
        priceAtAdd: product.price,
      });
    }

    await cart.save();

    return {
      success: true
    };
  } catch (err) {
    return {
      success: false,
      error: 'Unable to add item to cart'
    }
  }
}