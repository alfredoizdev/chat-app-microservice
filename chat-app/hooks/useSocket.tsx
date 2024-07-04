"use client";
import { useState, useEffect } from "react";
import io from "socket.io-client";

const useSocket = () => {
  const [messages, setMessages] = useState<any>([]);
  const [socketGetMsg, setSocketGetMsg] = useState<any>(null);

  useEffect(() => {
    const socket = io("http://server-app.com", {
      transports: ["websocket"],
      query: {
        token: localStorage.getItem("token") || "",
      },
    });

    setSocketGetMsg(socket);
  }, []);

  useEffect(() => {
    if (socketGetMsg) {
      const handleMessage = (msg: string) => {
        setMessages((prevMessages: any) => [...prevMessages, msg]);
        console.log("Received message: ", msg);
      };

      const handleConnectError = (err: any) => {
        console.error("Connection Error: ", err.message);
      };

      const handleConnectFailed = () => {
        console.error("Connection Failed");
      };

      const handleConnection = () => {
        console.log("Connected");
      };

      // Set up event listeners
      socketGetMsg.on("chat message", handleMessage);
      socketGetMsg.on("connect_error", handleConnectError);
      socketGetMsg.on("connect_failed", handleConnectFailed);
      socketGetMsg.on("connect", handleConnection);

      return () => {
        socketGetMsg.off("chat message", handleMessage);
        socketGetMsg.off("connect_error", handleConnectError);
        socketGetMsg.off("connect_failed", handleConnectFailed);
      };
    }
  }, [socketGetMsg]);

  return { socketGetMsg, messages };
};

export default useSocket;
