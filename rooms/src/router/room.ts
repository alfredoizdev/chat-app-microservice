import { Router } from "express";
import { roomController } from "../controllers/roomController";

const router = Router();

export const loginRouter = router.post("/api/login", roomController);
