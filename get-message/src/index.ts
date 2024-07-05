// src/get-service/get-service.ts
import express from "express";
import amqp from "amqplib";
import { Server } from "socket.io";
import http from "http";
import cors from "cors";
import morgan from "morgan";
import socketAuthMiddleware from "./middleware/socketMiddleware";

const app = express();
app.use(cors());
app.use(morgan("dev"));

const rabbitmqUrl = process.env.RABBITMQ_URL;

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

const queue = "chat";
let users: string[] = [];

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
    if (msg !== null) {
      const chat = msg.content.toString();
      const messageObject = JSON.parse(msg.content.toString());
      const { reciverId, senderId } = messageObject;
      const recivedId = `${users[reciverId]}`;
      const sender = `${users[senderId]}`;

      io.to(recivedId).to(sender).emit("chat message", messageObject);
      channel.ack(msg);
    }
  });
}

io.on("connection", (socket) => {
  console.log("a user connected", (socket as any).user.id);

  const userId = (socket as any).user.id;
  users[userId] = socket.id;

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

startRabbitMQ().catch(console.warn);

server.listen(4001, () => {
  console.log("Get service 1 running on port 4001");
});
