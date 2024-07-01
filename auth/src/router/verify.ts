import { verify } from "crypto";
import { Router } from "express";
import verifyTokenController from "../controllers/verifyTokenController";

const verifyTokenRouter = Router();

verifyTokenRouter.post("/api/verify", verifyTokenController);

export { verifyTokenRouter };
