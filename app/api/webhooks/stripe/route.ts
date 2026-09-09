import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

import connectToDatabase from '@/database/mongodb';
import Cart from '@/database/cart.model';
import { IProduct } from '@/database/product.model';
import Order from '@/database/order.model';
import { clearCartForUser } from '@/lib/actions/clearCart';
import { createCartSnapshotHash } from '@/lib/checkout/cartSnapshot';
import { stripe } from '@/lib/stripe/stripe';

export const runtime = 'nodejs';

type PopulatedCartItem = {
  product: IProduct;
  quantity: number;
  priceAtAdd: number;
};

export async function POST(request: NextRequest) {
  const signature = request.headers.get('stripe-signature');
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!signature || !webhookSecret) {
    return NextResponse.json({ error: 'Webhook configuration is incomplete.' }, { status: 400 });
  }

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(await request.text(), signature, webhookSecret);
  } catch (error) {
    console.error('Invalid Stripe webhook:', error);
    return NextResponse.json({ error: 'Invalid webhook signature.' }, { status: 400 });
  }

  if (
    event.type !== 'payment_intent.succeeded' &&
    event.type !== 'payment_intent.payment_failed' &&
    event.type !== 'payment_intent.canceled'
  ) {
    return NextResponse.json({ received: true });
  }

  const paymentIntent = event.data.object as Stripe.PaymentIntent;

  try {
    await connectToDatabase();

    const order = await Order.findOne({
      $or: [
        { paymentIntentId: paymentIntent.id },
        ...(paymentIntent.metadata.orderId ? [{ _id: paymentIntent.metadata.orderId }] : []),
      ],
    });
    if (!order) {
      return NextResponse.json({ error: 'Order for payment intent was not found.' }, { status: 404 });
    }

    if (order.paymentIntentId !== paymentIntent.id) {
      await Order.updateOne(
        { _id: order._id },
        { $set: { paymentIntentId: paymentIntent.id } },
      );
    }

    if (event.type === 'payment_intent.succeeded') {
      if (order.paymentStatus === 'paid') {
        return NextResponse.json({ received: true });
      }

      const cart = await Cart.findOne({ user: order.user }).populate<{
        items: Array<{ product: IProduct; quantity: number; priceAtAdd: number }>;
      }>('items.product');
      if (cart && cart.items.length > 0) {
        const currentSnapshotHash = createCartSnapshotHash(
          cart.items.map((item: PopulatedCartItem) => {
            if (!item.product || typeof item.product === 'string' || !('price' in item.product)) {
              throw new Error('A cart product could not be loaded during fulfillment.');
            }

            return {
              productId: item.product._id.toString(),
              quantity: item.quantity,
              unitPrice: Number(item.product.price),
            };
          }),
        );

        if (currentSnapshotHash === order.cartSnapshotHash) {
          const clearResult = await clearCartForUser(order.user.toString(), cart.updatedAt);
          if (!clearResult.success) {
            console.warn(`Cart was not cleared for payment ${paymentIntent.id}: ${clearResult.error}`);
          }
        } else {
          console.warn(`Cart changed before payment ${paymentIntent.id} was fulfilled.`);
        }
      }

      await Order.updateOne(
        { _id: order._id, paymentStatus: { $ne: 'paid' } },
        {
          $set: {
            paymentStatus: 'paid',
            paidAt: new Date(),
          },
        },
      );
    } else {
      await Order.updateOne(
        { _id: order._id, paymentStatus: { $ne: 'paid' } },
        {
          $set: {
            paymentStatus: event.type === 'payment_intent.canceled' ? 'canceled' : 'failed',
          },
        },
      );
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('Failed to process Stripe webhook:', error);
    return NextResponse.json({ error: 'Failed to process webhook.' }, { status: 500 });
  }
}
