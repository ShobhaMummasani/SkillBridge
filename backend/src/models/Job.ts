import mongoose, { Schema, Document, Types } from "mongoose";

export interface IJob extends Document {
  title: string;
  company: string;
  location: string;
  type: "Internship" | "Full-Time" | "Part-Time";
  description: string;
  skills: string[];
  postedBy: Types.ObjectId;
  createdAt: Date;
}

const jobSchema = new Schema<IJob>({
  title: { type: String, required: true },
  company: { type: String, required: true },
  location: { type: String, required: true },
  type: { type: String, enum: ["Internship", "Full-Time", "Part-Time"], required: true },
  description: { type: String, required: true },
  skills: { type: [String], default: [] },
  postedBy: { type: Schema.Types.ObjectId, ref: "User", required: true },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model<IJob>("Job", jobSchema);
