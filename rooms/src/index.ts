import express from "express";

import cors from "cors";
import connectToMongoDB from "./mongodb/connection";
import { loginRouter } from "./router/room";

const app = express();
app.use(express.json());
app.use(cors());

app.use(loginRouter);

const startServer = async () => {
  app.listen(4004, () => {
    console.log("Auth service running on port 4004");
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
