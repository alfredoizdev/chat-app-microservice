import express from "express";

import cors from "cors";
import connectToMongoDB from "./mongodb/connection";
import getHistory from "./router/getHistory";

const app = express();

app.use(express.json());
app.use(cors());

app.use(getHistory);

const startServer = async () => {
  app.listen(4005, () => {
    console.log("Auth service running on port 4005");
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
