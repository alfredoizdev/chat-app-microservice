"use server";
import axios from "axios";
import { cookies } from "next/headers";

export const postChatAction = async (
  message: string
): Promise<string | null> => {
  const storeCookie = cookies();

  const token = storeCookie.get("token")?.value;

  try {
    const response = await axios.post(
      "http://post-service.chat-app.svc.cluster.local:4002/api/messages",
      {
        message,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      }
    );

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log("error", error);
      return error.response?.data.msg || "Unexpected error";
    }
    return null;
  }
};
