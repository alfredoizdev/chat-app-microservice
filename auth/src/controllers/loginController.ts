import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import User, { IUser } from "../models/User";
import { verifyPassword } from "../common/password";
import { validateEmail } from "../common/email";

export const loginUser = async (req: Request, res: Response) => {
  const secret = process.env.JWT_SECRET;

  if (!secret) {
    return res.status(400).json({ msg: "Is not set env for token" });
  }

  try {
    const { password, email } = req.body;

    if (!password || !email) {
      return res
        .status(400)
        .json({ msg: "Username and password and email are required" });
    }

    if (!validateEmail(email)) {
      return res.status(400).json({ msg: "Invalid email format" });
    }

    let findUser = await User.findOne({ email: email }).exec();

    if (!findUser) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    console.log("here", verifyPassword(password, findUser.password));

    if (verifyPassword(password, findUser.password) !== true) {
      return res
        .status(400)
        .json({ msg: "Invalid credentials password don't match" });
    }

    const token = jwt.sign(
      { username: findUser.username, id: findUser.id },
      secret,
      {
        expiresIn: "1h",
      }
    );

    res.status(200).json({ token });
  } catch (error) {
    console.error("Error registering user: ", error);
    res.status(500).json({ msg: "Internal server error" });
  }
};
