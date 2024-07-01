import { Router } from "express";
import { registerUser } from "../controllers/registerController";

const router = Router();

// Register User
export const registerRouter = router.post("/api/register", registerUser);
