"use server";
import axios from "axios";
import { cookies } from "next/headers";
import { Chat } from "@/types/chat";

export const historyAction = async (
  senderId: string,
  receiverId: string
): Promise<Chat[] | null> => {
  if (!senderId || !receiverId) {
    return null;
  }

  const storeCookie = cookies();

  const token = storeCookie.get("token")?.value;

  try {
    const response = await axios.get(
      `http://history-service.chat-app.svc.cluster.local:4005/api/history?receiverId=${receiverId}&senderId=${senderId}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      }
    );

    if (response.status === 200) {
      return response.data;
    }

    return null;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log("error", error);
      return error.response?.data.msg || "Unexpected error";
    }
    return null;
  }
};
