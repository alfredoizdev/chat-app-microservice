import { User } from "@/types/user";
import { create } from "zustand";
import { devtools } from "zustand/middleware";
import axios from "axios";
import { Unread } from "@/types/chat";

type ChatState = {
  unread: Unread[];
  updateUnread: boolean;
  updateUnreadCount: () => void;
  getUreadMessages: () => Promise<void>;
};

export const useChatStore = create<ChatState>()(
  devtools(
    (set, get) => ({
      unread: [],
      updateUnread: false,
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
      updateUnreadCount: () => {
        set({ updateUnread: get().updateUnread ? false : true });
      },
    }),
    {
      name: "user-storage",
    }
  )
);
