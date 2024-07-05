import amqp from "amqplib";
import { Request, Response } from "express";

const rabbitmqUrl = process.env.RABBITMQ_URL;

const postMessageController = async (req: Request, res: Response) => {
  const queue = "chat";

  if (!rabbitmqUrl) {
    console.error("RabbitMQ URL not provided");
    process.exit(1);
  }

  const connection = await amqp.connect(rabbitmqUrl);
  console.log("Connected to RabbitMQ");
  const channel = await connection.createChannel();
  await channel.assertQueue(queue, { durable: false });

  channel.sendToQueue(queue, Buffer.from(JSON.stringify(req.body.chat)));
  res.status(200).send();
};

export default postMessageController;
