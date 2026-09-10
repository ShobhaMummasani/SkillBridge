import mongoose, { Schema, Document } from "mongoose";

export type UserRole = "student" | "recruiter";

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  role: UserRole;
  bio?: string;
  resumeLink?: string;
  company?: string; // used when role is recruiter
  createdAt: Date;
}

const userSchema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true, lowercase: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["student", "recruiter"], required: true },
  bio: { type: String, default: "" },
  resumeLink: { type: String, default: "" },
  company: { type: String, default: "" },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model<IUser>("User", userSchema);
