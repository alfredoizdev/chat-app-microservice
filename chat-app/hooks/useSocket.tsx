"use client";
import { useState, useEffect } from "react";
import { socket } from "@/lib/socket/io";
import { Socket } from "socket.io-client";
import { useChatStore } from "@/store/chatStore";

const useSocket = () => {
  const [messages, setMessages] = useState<any>([]);
  const [socketGetMsg, setSocketGetMsg] = useState<Socket>();
  const { getUreadMessages, unread } = useChatStore();

  useEffect(() => {
    setSocketGetMsg(socket(localStorage.getItem("token") || ""));

    const getUreadMessagesFirstTime = async () => {
      await getUreadMessages();
    };

    getUreadMessagesFirstTime();
  }, []);

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    if (socketGetMsg) {
      const handleMessage = (msg: string) => {
        setMessages((prevMessages: any) => [...prevMessages, msg]);
      };

      const handleUpdateUnread = async () => {
        console.log("Update Unread");

        timeout = setTimeout(async () => {
          await getUreadMessages();
        }, 100);
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
      socketGetMsg.on("update unread", handleUpdateUnread);

      return () => {
        socketGetMsg.off("chat message", handleMessage);
        socketGetMsg.off("connect_error", handleConnectError);
        socketGetMsg.off("connect_failed", handleConnectFailed);
        clearTimeout(timeout);
      };
    }
  }, [socketGetMsg]);

  return { messages, socketGetMsg, unread };
};

export default useSocket;
