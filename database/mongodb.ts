import mongoose from 'mongoose';

type MongooseCache = {
    conn: typeof mongoose | null,
    promise: Promise<typeof mongoose> | null
}

declare global {
    var mongoose: MongooseCache | undefined;
}

const MONGODB_URI = process.env.MONGODB_URI;

const cached: MongooseCache = global.mongoose || { conn: null, promise: null };

if(!global.mongoose) {
    global.mongoose = cached;
}

async function connectToDatabase(): Promise<typeof mongoose> {
    if(cached.conn) {
        return cached.conn;
    }

    if(!cached.promise) {
        if(!MONGODB_URI) {
            throw new Error('Please define the MONGODB_URI environment variable inside .env');
        }

        const options = { bufferCommands: false } // Disable Mongoose buffering

        cached.promise = mongoose
            .connect(MONGODB_URI, options)
            .then((mongoose) => mongoose);
    }

    try {
        cached.conn = await cached.promise;
    } catch(err) {
        console.log('ERROR CONNECTING')
        cached.promise = null;
        throw err;
    }

    return cached.conn;
}

export default connectToDatabase;