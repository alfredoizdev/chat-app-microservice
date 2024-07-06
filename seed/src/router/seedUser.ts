import { Router } from "express";
import { userSeedController } from "../controllers/userSeedController";

const seedUser = Router();

seedUser.get("/api/seed/users", userSeedController);

export default seedUser;
