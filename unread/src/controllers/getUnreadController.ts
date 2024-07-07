import { Request, Response } from "express";
import Unread from "../models/Unread";

export const getUnreadController = async (req: Request, res: Response) => {
  try {
    const unreads = await Unread.find();

    res.status(200).json(unreads);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};
