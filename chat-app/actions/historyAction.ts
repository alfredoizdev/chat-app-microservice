"use server";
import axios from "axios";
import { cookies } from "next/headers";
import { Chat } from "@/types/chat";

export const historyAction = async (
  receiverId: string
): Promise<Chat[] | []> => {
  if (!receiverId) {
    return [];
  }

  const storeCookie = cookies();

  const token = storeCookie.get("token")?.value;
  const senderIdCookie = storeCookie.get("currentUser")?.value;
  const senderIdParsed = JSON.parse(senderIdCookie as string).id;

  if (!token || !senderIdParsed) {
    return [];
  }

  try {
    const response = await axios.get(
      `http://history-service.chat-app.svc.cluster.local:4005/api/history?receiverId=${receiverId}&senderId=${senderIdParsed}`,
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

    return [];
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log("error", error);
      return error.response?.data.msg || "Unexpected error";
    }
    return [];
  }
};
