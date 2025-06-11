// src/dbConnection/database.ts

import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const DATABASE_URL = process.env.DATABASE_URL || 'mongodb://localhost:27017/ai-powered-recipe-generator';

const connectDB = async () => {
	try {
		await mongoose.connect(DATABASE_URL);
		console.log('Connected to MongoDB');
	} catch (error) {
		console.error('MongoDB connection error:', error);
	}
};

export default connectDB;
