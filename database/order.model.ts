import { Document, Schema, models, model, Types } from 'mongoose';

/**
 * Subdocument for a product line in an order
 */
export interface IOrderProduct {
    product: Types.ObjectId;
    quantity: number;
    totalPrice: number;
    priceAtPurchase: number; // snapshot of unit price when order was placed
}

/**
 * Order document interface
 */
export interface IOrder extends Document {
    user: Types.ObjectId;
    products: IOrderProduct[];
    createdAt: Date;
    totalPrice: number;
}

/**
 * Schema for individual product line items within an order.
 * Not given its own model since it only exists in the context of an Order.
 */
const OrderProductSchema = new Schema<IOrderProduct>(
  {
    product: {
      type: Schema.Types.ObjectId,
      ref: 'Product',
      required: [true, 'Product reference is required'],
    },
    quantity: {
      type: Number,
      required: [true, 'Quantity is required'],
      min: [1, 'Quantity must be at least 1'],
    },
    totalPrice: {
        type: Number,
        required: [true, 'Total price is required'],
        min: [0, 'Total price cannot be negative'],
    },
    priceAtPurchase: {
        type: Number,
        required: [true, 'Product Price at purchase is required'],
        min: [0, 'Product Price at purchase cannot be negative'],
    },
  },
  { _id: false } // no need for a separate id per line item
);

/**
 * Order schema
 * - user: reference to User
 * - products: array of product subdocuments (product ref, quantity, totalPrice, priceAtPurchase)
 * - createdAt: timestamp when order was created
 *
 * TODO: consider adding an order status field if application logic requires it.
 */
const orderSchema = new Schema<IOrder>(
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: [true, 'User is required for an order'],
            index: true,
        },
        products: [OrderProductSchema],  
        totalPrice: Number,
    },
    {
        timestamps: true
    }
);

// Index to speed up queries for a user's orders
orderSchema.index({ user: 1 });

const Order = models.Order || model<IOrder>('Order', orderSchema);

export default Order;
