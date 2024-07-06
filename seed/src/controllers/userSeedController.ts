import { Request, Response } from "express";
import { USER_SEED } from "../const/users";
import User, { IUser } from "../models/User";

export const userSeedController = async (req: Request, res: Response) => {
  try {
    const users = await User.findOne();

    if (users) {
      return res.status(400).json({ msg: "users was found" });
    }

    for (const userData of USER_SEED) {
      const user = new User(userData);
      await user.save();
    }

    res.status(200).json({ msg: "users seeded" });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};
