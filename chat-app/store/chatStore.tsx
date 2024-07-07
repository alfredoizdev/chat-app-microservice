import { User } from "@/types/user";
import { create } from "zustand";
import { devtools } from "zustand/middleware";
import axios from "axios";
import { Unread } from "@/types/chat";

type ChatState = {
  unread: Unread[];
  getUreadMessages: () => Promise<void>;
};

export const useChatStore = create<ChatState>()(
  devtools(
    (set) => ({
      unread: [],
      getUreadMessages: async () => {
        try {
          const response = await axios.get(
            `${process.env.NEXT_PUBLIC_API_URI}/unread`,
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: `${localStorage.getItem("token")}` || "",
              },
            }
          );

          return set({ unread: response.data });
        } catch (error) {
          console.log("Error getting unread messages", error);
          set({ unread: [] });
        }
      },
    }),
    {
      name: "user-storage",
    }
  )
);
