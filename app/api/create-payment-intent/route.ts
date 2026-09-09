import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';

import { authOptions } from '@/lib/authOptions';
import connectToDatabase from '@/database/mongodb';
import Cart from '@/database/cart.model';
import { IProduct } from '@/database/product.model';
import Order from '@/database/order.model';
import { createCartSnapshotHash } from '@/lib/checkout/cartSnapshot';
import { stripe } from '@/lib/stripe/stripe';

type PopulatedCartItem = {
  product: IProduct;
  quantity: number;
  priceAtAdd: number;
};

export async function POST() {
  const session = await getServerSession(authOptions);
  const userId = session?.user?.id;

  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    await connectToDatabase();

    const cart = await Cart.findOne({ user: userId }).populate<{
      items: Array<{ product: IProduct; quantity: number; priceAtAdd: number }>;
    }>('items.product');

    if (!cart || cart.items.length === 0) {
      return NextResponse.json({ error: 'Your cart is empty.' }, { status: 400 });
    }

    const products: Array<{
      productId: string;
      quantity: number;
      price: number;
      name: string;
    }> = cart.items.map((item: PopulatedCartItem) => {
      if (!item.product || typeof item.product === 'string' || !('price' in item.product)) {
        throw new Error('A cart product could not be loaded.');
      }

      const price = Number(item.product.price);
      if (!Number.isFinite(price) || price < 0 || !Number.isInteger(item.quantity) || item.quantity < 1) {
        throw new Error('A cart item has an invalid price or quantity.');
      }

      if (typeof item.product.quantity === 'number' && item.product.quantity < item.quantity) {
        throw new Error(`${item.product.name} is no longer available in the requested quantity.`);
      }

      return {
        productId: item.product._id.toString(),
        quantity: item.quantity,
        price,
        name: item.product.name,
      };
    });

    const subtotal = products.reduce((total, item) => total + item.price * item.quantity, 0);
    const amountSubtotal = Math.round(subtotal * 100);
    const amountShipping = 0;
    const amountTax = 0;
    const amountTotal = amountSubtotal + amountShipping + amountTax;
    const cartSnapshotHash = createCartSnapshotHash(
      products.map((item) => ({
        productId: item.productId,
        quantity: item.quantity,
        unitPrice: item.price,
      })),
    );

    const order = await Order.create({
      user: userId,
      products: products.map((item) => ({
        product: item.productId,
        quantity: item.quantity,
        totalPrice: item.price * item.quantity,
        priceAtPurchase: item.price,
      })),
      totalPrice: subtotal,
      paymentStatus: 'pending',
      amountSubtotal,
      amountShipping,
      amountTax,
      amountTotal,
      currency: 'usd',
      cartSnapshotHash,
    });

    const paymentIntent = await stripe.paymentIntents.create({
      amount: amountTotal,
      currency: 'usd',
      automatic_payment_methods: { enabled: true },
      metadata: {
        orderId: order._id.toString(),
        userId,
      },
    });

    await Order.updateOne(
      { _id: order._id },
      { $set: { paymentIntentId: paymentIntent.id } },
    );

    return NextResponse.json({
      clientSecret: paymentIntent.client_secret,
      amountTotal,
      currency: 'usd',
    });
  } catch (error) {
    console.error('Failed to create payment intent:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to create payment intent' },
      { status: 500 },
    );
  }
}