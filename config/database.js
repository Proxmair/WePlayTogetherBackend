import mongoose from "mongoose";

export const connectDatabase = async () => {
  try {
    const connection = await mongoose.connect(process.env.DB_URL);
    console.log(`MongoDB connected to: ${connection.connection.host}`);
  } catch (error) {
    console.error(`MongoDB connection error: ${error.message}`);
    process.exit(1); // Exit process with failure
  }
};
