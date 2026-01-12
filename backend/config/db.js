const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config({ quiet: true });

const MONGODB_URL = process.env.MONGODB_URL;

let isConnected = false;

const connectDB = async () => {
    if (isConnected) {
        return;
    }

    try {
        mongoose.set('bufferCommands', false); 

        const conn = await mongoose.connect(MONGODB_URL, {
            serverSelectionTimeoutMS: 5000, 
        });

        isConnected = conn.connections[0].readyState;
        console.log('MongoDB connected');
    } catch (error) {
        console.error('MongoDB connection error:', error.message);
        throw error; 
    }
};

module.exports = connectDB;
