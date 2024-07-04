import { Request, Response } from "express";
import User from "../models/User";
import jwt from "jsonwebtoken";

export const userListController = async (req: Request, res: Response) => {
  const token = req.header("authorization");

  const userToFilterOutId = jwt.decode(token!) as { id: string };
  // send all user are no equel of id ($ne) of userToFilterOutId
  const users = await User.find({ _id: { $ne: userToFilterOutId.id } });

  res.status(200).send(users);
};
