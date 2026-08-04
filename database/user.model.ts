import { Document, Schema, models, model } from 'mongoose';

export interface IUser extends Document {
    name: string;
    emailAddress: string;
    password: string;
    address: string;
    postalCode: string;
}

const userSchema = new Schema<IUser>(
    {
        name: {
            type: String,
            required: [true, 'Name is required'],
            trim: true,
            maxLength: [100, 'Name cannot exceed 100 characters'],
        },
        emailAddress: {
            type: String,
            required: [true, 'Email address is required'],
            trim: true,
        },
        password: {
            type: String,
            required: [true, 'Password is required'],
            trim: true,
        },
        address: {
            type: String,
            // required: [true, 'Address is required'],
            trim: true,
        },
        postalCode: {
            type: String,
            // required: [true, 'Postal code is required'],
            trim: true,
        },
    },
    {
        timestamps: true
    }
);

const User = models.User || model<IUser>('User', userSchema);

export default User;