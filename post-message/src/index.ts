// src/post-service/post-service.ts
import express from "express";
import cors from "cors";
import messageRouter from "./router/message";

const app = express();
app.use(cors());
app.use(express.json());

async function startRabbitMQ() {
  app.use(messageRouter);

  app.listen(4002, () => {
    console.log("Post service running on port 4002");
  });
}

startRabbitMQ().catch(console.warn);
