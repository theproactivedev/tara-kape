import { Document, models, model, Schema } from 'mongoose';

export interface IProduct extends Document {
    name: string;
    quantity: number;
    image: string;
    price: number;
    // Fields added based on lib/constants BEANS
    origin?: string;
    process?: string;
    roast?: number; // 1 light – 3 dark
    notes?: string[];
    /**
     * Human-friendly price label from seed data (e.g. "$21").
     * Keep numeric `price` for calculations and `priceLabel` for display when needed.
     */
    priceLabel?: string;
}

const productSchema = new Schema<IProduct>(
    {
        name: {
            type: String,
            required: [true, 'Name is required'],
            trim: true,
            maxLength: [100, 'Name cannot exceed 100 characters'],
        },
        quantity: {
            type: Number,
            required: [true, 'Quantity is required'],
            min: [0, 'Quantity cannot be negative'],
        },
        image: {
            type: String,
            required: [true, 'Image is required'],
        },
        price: {
            type: Number,
            required: [true, 'Price is required'],
            min: [0, 'Price cannot be negative'],
        },
        // BEANS-derived fields
        origin: {
            type: String,
            trim: true,
        },
        process: {
            type: String,
            trim: true,
        },
        roast: {
            type: Number,
            min: [1, 'Roast level must be between 1 and 3'],
            max: [3, 'Roast level must be between 1 and 3'],
        },
        notes: {
            type: [String],
            default: [],
        },
        priceLabel: {
            type: String,
            trim: true,
            maxLength: [20, 'Price label cannot exceed 20 characters'],
        },
    },
    { timestamps: true }
);

const Product = models.Product || model<IProduct>('Product', productSchema);

export default Product;