// src/get-service/get-service.ts
import express from "express";
import amqp from "amqplib";
import { Server } from "socket.io";
import http from "http";
import cors from "cors";
import socketAuthMiddleware from "./middleware/socketMiddleware";

const app = express();
app.use(cors());

const rabbitmqUrl = process.env.RABBITMQ_URL;

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

const queue = "chat";

io.use(socketAuthMiddleware);

async function startRabbitMQ() {
  if (!rabbitmqUrl) {
    console.error("RabbitMQ URL not provided");
    process.exit(1);
  }

  const connection = await amqp.connect(rabbitmqUrl);
  const channel = await connection.createChannel();
  await channel.assertQueue(queue, { durable: false });

  channel.consume(queue, (msg) => {
    console.log("Received message: ", msg?.content.toString());
    if (msg !== null) {
      const message = msg.content.toString();
      io.emit("chat message", message);
      channel.ack(msg);
    }
  });
}

io.on("connection", (socket) => {
  console.log("a user connected", (socket as any).user.id);
  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

startRabbitMQ().catch(console.warn);

server.listen(4001, () => {
  console.log("Get service 1 running on port 4001");
});
