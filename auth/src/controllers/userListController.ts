import { Request, Response } from "express";
import User from "../models/User";

export const userListController = async (req: Request, res: Response) => {
  const users = await User.find();
  res.status(200).send(users);
};
