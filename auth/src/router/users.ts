import { Router } from "express";
import { userListController } from "../controllers/userListController";
import authMiddleware from "../middleware/authMiddleware";

const usersRouter = Router();

usersRouter.get("/api/users", authMiddleware, userListController);

export default usersRouter;
