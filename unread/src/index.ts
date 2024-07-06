import express from "express";
import amqp from "amqplib";

import cors from "cors";
import connectToMongoDB from "./mongodb/connection";
import updateUnreadController from "./controllers/updateMsgController";
import getUread from "./router/getUnread";

const app = express();

app.use(express.json());
app.use(cors());

app.use(getUread);

const rabbitmqUrl = process.env.RABBITMQ_URL;
const unread = "unread";

async function startRabbitMQ() {
  if (!rabbitmqUrl) {
    console.error("RabbitMQ URL not provided");
    process.exit(1);
  }

  const connection = await amqp.connect(rabbitmqUrl);
  const channel = await connection.createChannel();
  await channel.assertQueue(unread, { durable: false });

  channel.consume(unread, (msg) => {
    if (msg !== null) {
      const messageObject = JSON.parse(msg.content.toString());

      console.log("Message received on unread", messageObject);

      updateUnreadController(messageObject.receiverId, messageObject.senderId);

      channel.ack(msg);
    }
  });
}

const startServer = async () => {
  startRabbitMQ().catch(console.warn);

  app.listen(4006, () => {
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
