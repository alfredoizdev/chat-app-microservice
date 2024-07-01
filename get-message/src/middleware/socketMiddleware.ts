import { Socket } from "socket.io";
import { ExtendedError } from "socket.io/dist/namespace";
import jwt from "jsonwebtoken";

const socketAuthMiddleware = (
  socket: Socket,
  next: (err?: ExtendedError) => void
) => {
  let secret = process.env.JWT_SECRET;

  let token =
    socket.handshake.query.token || socket.handshake.headers["authorization"];

  console.log("Token: ", token);

  // Ensure token is a single string
  if (Array.isArray(token)) {
    token = token[0];
  }

  if (!token) {
    return next(new Error("Authentication error"));
  }

  if (!secret) {
    console.error("Is not set env for token");
    return next(new Error("Authentication error"));
  }

  try {
    const decoded = jwt.verify(token, secret);
    (socket as any).user = decoded;
    next();
  } catch (err) {
    console.error("Token verification failed:", err);
    next(new Error("Authentication error"));
  }
};

export default socketAuthMiddleware;
