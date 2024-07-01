import { Router } from "express";
import { loginUser } from "../controllers/loginController";

const router = Router();

export const loginRouter = router.post("/api/login", loginUser);
