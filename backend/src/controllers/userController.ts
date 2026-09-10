import { Response } from "express";
import User from "../models/User";
import { AuthRequest } from "../middleware/auth";

export const getProfile = async (req: AuthRequest, res: Response) => {
  const user = await User.findById(req.user!.id).select("-password");
  res.json(user);
};

export const updateProfile = async (req: AuthRequest, res: Response) => {
  const { name, bio, resumeLink, company } = req.body;
  const user = await User.findById(req.user!.id);
  if (!user) return res.status(404).json({ message: "User not found" });

  if (name !== undefined) user.name = name;
  if (bio !== undefined) user.bio = bio;
  if (resumeLink !== undefined) user.resumeLink = resumeLink;
  if (company !== undefined) user.company = company;

  await user.save();
  const { password, ...safeUser } = user.toObject();
  res.json(safeUser);
};
