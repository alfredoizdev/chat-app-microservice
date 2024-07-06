import express from "express";

import cors from "cors";
import connectToMongoDB from "./mongodb/connection";
import seedUser from "./router/seedUser";

const app = express();

app.use(express.json());
app.use(cors());

app.use(seedUser);

const startServer = async () => {
  app.listen(4007, () => {
    console.log("Unread service running on port 4006");
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
