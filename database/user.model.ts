import { Document, Schema, models, model, HydratedDocument } from 'mongoose';

export interface IUser {
    name: string;
    email: string;
    passwordHash: string;
    address?: string;
    city?: string;
    stateOrProvince?: string;
    zip?: string;
    country?: string;
}

export type UserDocument = HydratedDocument<IUser>;

const userSchema = new Schema<IUser>(
    {
        name: {
            type: String,
            required: [true, 'Name is required'],
            trim: true,
            maxLength: [100, 'Name cannot exceed 100 characters'],
        },
        email: {
            type: String,
            required: [true, 'Email address is required'],
            trim: true,
            lowercase: true,
            unique: true,
        },
        passwordHash: {
            type: String,
            required: [true, 'Password is required'],
            select: false,
        },
        address: {
            type: String,
            trim: true,
        },
        city: {
            type: String,
            trim: true,
        },
        stateOrProvince: {
            type: String,
            trim: true,
        },
        zip: {
            type: String,
            trim: true,
        },
        country: {
            type: String,
            trim: true,
        },
    },
    {
        timestamps: true,
        collection: 'users'
    }
);

const User = models.User || model<IUser>('User', userSchema);

export default User;