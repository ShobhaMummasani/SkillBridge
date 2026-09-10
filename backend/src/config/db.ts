import mongoose from "mongoose";
import dns from "dns";

// Windows + some networks don't let Node's built-in DNS resolver find
// MongoDB Atlas's special address (SRV record), even though the system
// itself can. Forcing Node to ask Google's DNS directly fixes it.
dns.setServers(["8.8.8.8", "8.8.4.4"]);

export const connectDB = async (): Promise<void> => {
  const uri = process.env.MONGO_URI;
  if (!uri) {
    throw new Error("MONGO_URI is missing in .env");
  }
  await mongoose.connect(uri);
  console.log("MongoDB connected");
};
