import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import Room from "../models/Room";

export const roomController = async (req: Request, res: Response) => {
  res.status(200).send({ msg: "Room controller works!" });
};
