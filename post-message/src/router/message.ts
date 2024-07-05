import { Router } from "express";
import authMiddleware from "../middleware/authMiddleware";
import postMessageController from "../controllers/postMessageController";

const messageRouter = Router();

messageRouter.post("/api/messages", authMiddleware, postMessageController);

export default messageRouter;
