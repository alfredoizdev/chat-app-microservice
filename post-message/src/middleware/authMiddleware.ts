import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  let secret = process.env.JWT_SECRET;

  console.log(req.header("authorization"));

  if (!secret) {
    console.error("Is not set env for token");
    return res.status(400).json({ msg: "Is not set env for token" });
  }

  const token = req.header("authorization");

  if (!token) {
    return res.status(401).json({ msg: "No token, authorization denied" });
  }

  try {
    const decoded = jwt.verify(token, secret);

    if (typeof decoded === "string") {
      return res.status(401).json({ msg: "Token is not valid" });
    }

    next();
  } catch (err) {
    console.error("Token verification failed:", err);
    res.status(401).json({ msg: "Token is not valid" });
  }
};

export default authMiddleware;
