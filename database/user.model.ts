import { Document, Schema, models, model } from 'mongoose';

export interface IUser extends Document {
    name: string;
    email: string;
    passwordHash: string;
}

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
    },
    {
        timestamps: true,
        collection: 'users'
    }
);

const User = models.User || model<IUser>('User', userSchema);

export default User;