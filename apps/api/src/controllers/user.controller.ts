import { NextFunction, Request, Response } from "express";
import { User } from "../models/user.model";
export const getUser = (req: Request, res: Response) => {
  res.status(200).json({
    message: "Authorized User",
    user: req.user,
  });
};
export const allUsers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const users = await User.find().select("-password");
    res.status(200).json({ users });
  } catch (err) {
    next(err);
  }
};
export const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const deleted = await User.findByIdAndDelete(id);

    if (!deleted) {
      res.status(404).json({ message: "User not found" });
      return;
    }
    res.status(200).json({ message: "User deleted" });

  }
  catch (err) {
    next(err);
  }
};
export const patchUser = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  const { role } = req.body;
  try {
    const patchUser = await User.findByIdAndUpdate(id, { role }, { new: true });
    if (!patchUser) {
      res.status(404).json({ message: "User not found" });
      return;
    }
    res.status(200).json({ message: " User Updated" });

  } catch (err) {
    next(err);
  }
}
