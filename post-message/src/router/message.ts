import { Router } from "express";
import amqp from "amqplib";
import authMiddleware from "../middleware/authMiddleware";

const rabbitmqUrl = process.env.RABBITMQ_URL;

console.log("RabbitMQ URL: ", rabbitmqUrl);

const messageRouter = Router();

messageRouter.post("/api/messages", authMiddleware, async (req, res) => {
  const queue = "chat";
  const { senderId, recivedId } = req.body;

  if (!rabbitmqUrl) {
    console.error("RabbitMQ URL not provided");
    process.exit(1);
  }

  const connection = await amqp.connect(rabbitmqUrl);
  console.log("Connected to RabbitMQ");
  const channel = await connection.createChannel();
  await channel.assertQueue(queue, { durable: false });

  const msg = req.body.message;
  console.log("Sending message: ", msg);
  channel.sendToQueue(queue, Buffer.from(msg));
  res.status(200).send();
});

export default messageRouter;
