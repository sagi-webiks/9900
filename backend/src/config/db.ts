import mongoose from 'mongoose';
import { MONGO_URI } from './constants';
import type { ConnectOptions } from 'mongoose';

const connectToDatabase = async () => {
    try {
        console.log('🍃 MONGO_URI', MONGO_URI);
        await mongoose.connect(MONGO_URI as string); 
        console.log('🍃 Connected to MongoDB');
    } catch (error) {
        console.error('🍃 Connection to MongoDB failed:', (error as Error).message || error);
        process.exit(1);
    }
};

export default connectToDatabase;
