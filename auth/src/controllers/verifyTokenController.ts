import { Request, Response } from "express";
import jwt from "jsonwebtoken";

const verifyTokenController = async (req: Request, res: Response) => {
  const secret = process.env.JWT_SECRET;
  const { token } = req.body;
  try {
    if (!secret) {
      return res.status(400).json({ msg: "Is not set env for token" });
    }

    const decoded = jwt.verify(token, secret);

    if (typeof decoded === "string") {
      return res.status(401).json({ msg: "Token is not valid" });
    }

    res.status(200).json({ msg: "Token is valid" });
  } catch (error) {
    res.status(401).json({ msg: "Token is not valid" });
  }
};

export default verifyTokenController;
