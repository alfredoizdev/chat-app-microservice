import { Router } from "express";

import { getUnreadController } from "../controllers/getUnreadController";
import authMiddleware from "../middleware/authMiddleware";

const getUread = Router();

getUread.get("/api/unread", authMiddleware, getUnreadController);

export default getUread;
