import { Request, Response } from "express";
import User, { IUser } from "../models/User";
import { validateEmail } from "../common/email";

export const registerUser = async (req: Request, res: Response) => {
  try {
    const { username, password, email } = req.body;

    if (!username || !password || !email) {
      return res
        .status(400)
        .json({ msg: "Username and password and email are required" });
    }

    if (!validateEmail(email)) {
      return res.status(400).json({ msg: "Invalid email format" });
    }

    let user: IUser | null = await User.findOne({ username });

    if (user) {
      return res.status(400).json({ msg: "User already exists" });
    }

    const newUser = new User(
      {
        username,
        password,
        email,
      },
      {
        timestamps: true,
        new: true,
      }
    );
    await newUser.save();

    res.status(200).json({ newUser });
  } catch (error) {
    console.error("Error registering user: ", error);
    res.status(500).json({ msg: "Internal server error" });
  }
};
