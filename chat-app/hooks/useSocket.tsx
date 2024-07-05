"use client";
import { useState, useEffect } from "react";
import { socket } from "@/lib/socket/io";
import { Socket } from "socket.io-client";

const useSocket = () => {
  const [messages, setMessages] = useState<any>([]);
  const [socketGetMsg, setSocketGetMsg] = useState<Socket>();

  useEffect(() => {
    setSocketGetMsg(socket(localStorage.getItem("token") || ""));
  }, []);

  useEffect(() => {
    console.log("socketGetMsg", socketGetMsg?.connected);

    if (socketGetMsg) {
      const handleMessage = (msg: string) => {
        setMessages((prevMessages: any) => [...prevMessages, msg]);
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

  return { messages };
};

export default useSocket;
