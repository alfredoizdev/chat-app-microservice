import express from "express";
import amqp from "amqplib";

import storeMsgController from "./controllers/storeMsgController";

import cors from "cors";
import connectToMongoDB from "./mongodb/connection";
import getHistory from "./router/getHistory";

const app = express();

app.use(express.json());
app.use(cors());

const rabbitmqUrl = process.env.RABBITMQ_URL;
const historyQueue = "history";

app.use(getHistory);

async function startRabbitMQ() {
  if (!rabbitmqUrl) {
    console.error("RabbitMQ URL not provided");
    process.exit(1);
  }

  const connection = await amqp.connect(rabbitmqUrl);
  const channel = await connection.createChannel();
  await channel.assertQueue(historyQueue, { durable: false });

  channel.consume(historyQueue, (msg) => {
    if (msg !== null) {
      const messageObject = JSON.parse(msg.content.toString());

      storeMsgController(messageObject);

      channel.ack(msg);
    }
  });
}

const startServer = async () => {
  startRabbitMQ().catch(console.warn);

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
