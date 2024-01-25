import { config } from '@config/index';
import mongoose from 'mongoose';

/**
 * Connects to MongoDB
 * @returns {Promise<void>}
 * @throws {Error}
 * @description Connects to MongoDB using the MONGO_URI config variable.
 */
async function dbConnect(): Promise<void> {
    try {
        console.log('Connecting to MongoDB...');
        mongoose.set('strictQuery', false);
        await mongoose.connect(config.env.MONGO_URI);
        console.log('Connected to MongoDB !\n');
        mongoose.connection.on('error', (error: Error) => {
            console.error('POINT::1, Error While exicuting dbConnect()', error);
            throw error;
        });
    } catch (error) {
        console.error('POINT::2, Connection error:', error);
        throw error;
    }
}

export default dbConnect;
