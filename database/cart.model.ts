import { HydratedDocument, Schema, Types, model, models } from 'mongoose';

export interface ICartItem {
  product: string;
  quantity: number;
  priceAtAdd: number;
}

interface ICartBase<TProduct = Types.ObjectId> {
  user: string;
  items: { product: TProduct; quantity: number, priceAtAdd: number }[];
}

export type ICart = ICartBase; // unpopulated
export type ICartPopulated = ICartBase<ICartItem>; // after .populate('items.product')

export type CartDocument = HydratedDocument<ICart>;

const CartItemSchema = new Schema(
  {
    product: { 
      type: Schema.Types.ObjectId,
      ref: "Product",
      required: true
    },
    quantity: { 
      type: Number,
      required: true,
      min: 1,
      default: 1
    },
    priceAtAdd: {
      type: Number,
      required: true, // snapshot price when added, useful for price-change detection
    },
  },
  { _id: false }
);

const CartSchema = new Schema({
  user: { 
    type: Schema.Types.ObjectId, 
    ref: "User", 
    required: true, 
    unique: true },
  items: [CartItemSchema],
}, { timestamps: true });

const Cart = models.Cart || model("Cart", CartSchema);

export default Cart;