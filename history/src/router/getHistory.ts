import { Router } from "express";
import { getHistoryController } from "../controllers/getHistoryController";
import authMiddleware from "../middleware/authMiddleware";

const router = Router();

const getHistory = router.get(
  "/api/history",
  authMiddleware,
  getHistoryController
);

export default getHistory;
