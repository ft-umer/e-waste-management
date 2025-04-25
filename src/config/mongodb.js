import dotenv from 'dotenv';
dotenv.config();  // Load environment variables

console.log(process.env.MONGODB_URI);  // Check if it's loaded correctly

import mongoose from 'mongoose';

export const connectDB = async () => {
  try {
    const uri = process.env.MONGODB_URI;

    if (!uri) {
      throw new Error("MONGODB_URI is not defined in the environment variables.");
    }

    console.log('MongoDB URI:', uri);  // Log to ensure the URI is being read correctly

    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('MongoDB connected successfully');
  } catch (err) {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  }
};
