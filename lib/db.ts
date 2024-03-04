import mongoose, { Connection } from "mongoose";

let cachedConnection: Connection | null;

export const connectToMongoDB = async () => {
  if (cachedConnection) {
    return cachedConnection;
  }
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI as string);
    console.log("MongoDB connected");
    cachedConnection = conn.connection;
  } catch (error) {
    console.error("MongoDB connection error", error);
  }
};
