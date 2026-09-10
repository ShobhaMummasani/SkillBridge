import mongoose from "mongoose";
import dns from "dns";

dns.setServers(["8.8.8.8", "8.8.4.4"]);

let cached = (global as any)._mongooseConn as Promise<typeof mongoose> | undefined;

export const connectDB = async (): Promise<typeof mongoose> => {
  if (cached) return cached;

  const uri = process.env.MONGO_URI;
  if (!uri) {
    throw new Error("MONGO_URI is missing in .env");
  }

  cached = mongoose.connect(uri).then((m) => {
    console.log("MongoDB connected");
    return m;
  });
  (global as any)._mongooseConn = cached;

  return cached;
};