import mongoose from 'mongoose';

type MongooseCache = {
    conn: typeof mongoose | null,
    promise: Promise<typeof mongoose> | null
}

declare global {
    var mongoose: MongooseCache | undefined;
}

const MONGODB_URL = process.env.MONGODB_URL;

const cached: MongooseCache = global.mongoose || { conn: null, promise: null };

if(!global.mongoose) {
    global.mongoose = cached;
}

async function connectToDatabase(): Promise<typeof mongoose> {
    if(cached.conn) {
        return cached.conn;
    }

    if(!cached.promise) {
        if(!MONGODB_URL) {
            throw new Error('Please define the MONGODB_URL environment variable inside .env');
        }

        const options = { bufferCommands: false } // Disable Mongoose buffering

        cached.promise = mongoose
            .connect(MONGODB_URL, options)
            .then((mongoose) => mongoose);
    }

    try {
        cached.conn = await cached.promise;
    } catch(err) {
        cached.promise = null;
        throw err;
    }

    return cached.conn;
}

export default connectToDatabase;