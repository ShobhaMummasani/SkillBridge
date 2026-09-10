import mongoose, { Schema, Document, Types } from "mongoose";

export type ApplicationStatus = "Applied" | "Shortlisted" | "Rejected" | "Accepted";

export interface IApplication extends Document {
  job: Types.ObjectId;
  applicant: Types.ObjectId;
  status: ApplicationStatus;
  resumeLink: string;
  coverNote?: string;
  createdAt: Date;
}

const applicationSchema = new Schema<IApplication>({
  job: { type: Schema.Types.ObjectId, ref: "Job", required: true },
  applicant: { type: Schema.Types.ObjectId, ref: "User", required: true },
  status: { type: String, enum: ["Applied", "Shortlisted", "Rejected", "Accepted"], default: "Applied" },
  resumeLink: { type: String, required: true },
  coverNote: { type: String, default: "" },
  createdAt: { type: Date, default: Date.now },
});

applicationSchema.index({ job: 1, applicant: 1 }, { unique: true });

export default mongoose.model<IApplication>("Application", applicationSchema);
