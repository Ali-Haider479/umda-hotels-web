import mongoose from "mongoose";
import '@/models/user';
import '@/models/hotel';
import '@/models/room';
import '@/models/bookings';

let isConnected = false; // track the connection

export const connectToDB = async () => {
  mongoose.set("strictQuery", false);

  if (isConnected) {
    console.log("MongoDB is already connected");
    return;
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      dbName: "umda-hotels",
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    isConnected = true;
    console.log("MongoDB connected");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    throw new Error("MongoDB connection failed");
  }
};
