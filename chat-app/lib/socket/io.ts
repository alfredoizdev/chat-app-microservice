import { io, Socket } from "socket.io-client";

export const socket = (token: string): Socket => {
  return io("http://server-app.com", {
    transports: ["websocket"],
    query: {
      token,
    },
  });
};
