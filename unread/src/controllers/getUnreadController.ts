import { Request, Response } from "express";
import History from "../models/Unread";

export const getUnreadController = async (req: Request, res: Response) => {
  const { receiverId, senderId } = req.query;

  try {
    const history = await History.find({
      $or: [
        { senderId: receiverId, receiverId: senderId },
        { senderId: senderId, receiverId: receiverId },
      ],
    });

    res.status(200).json(history);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};
