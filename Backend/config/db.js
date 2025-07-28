import mongoose from 'mongoose';
export const connectDB = async () => {
  try {
    const mongoose = await import('mongoose');
    const dotenv = await import('dotenv');
    dotenv.config();

    const conn = await mongoose.default.connect(process.env.NONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(`MongoDB connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
}