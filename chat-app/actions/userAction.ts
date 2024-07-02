"use server";
import { User } from "@/types/user";
import axios from "axios";
import { cookies } from "next/headers";

export const fetchUser = async (): Promise<User[] | []> => {
  const cookieStore = cookies();

  const token = cookieStore.get("token")?.value || "";

  console.log("token", token);

  try {
    const { data } = await axios.get(
      "http://auth-service.chat-app.svc.cluster.local:4003/api/users",
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`,
        },
      }
    );

    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log("error ====>", error.response?.data);
      return [];
    }
    return [];
  }
};
