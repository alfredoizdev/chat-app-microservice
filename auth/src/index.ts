import express from "express";

import cors from "cors";
import connectToMongoDB from "./mongodb/connection";
import { registerRouter } from "./router/register";
import { loginRouter } from "./router/login";
import { verifyTokenRouter } from "./router/verify";
import usersRouter from "./router/users";

const app = express();
app.use(express.json());
app.use(cors());

app.use(registerRouter);
app.use(loginRouter);
app.use(verifyTokenRouter);
app.use(usersRouter);

const startServer = async () => {
  app.listen(4003, () => {
    console.log("Auth service running on port 4003");
  });
  try {
    await connectToMongoDB();
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Failed to connect to MongoDB", error);
    process.exit(1); // Exit the process with failure code
  }
};

startServer();
