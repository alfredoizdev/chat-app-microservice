import { useState, useEffect } from "react";
import { historyAction } from "@/actions/historyAction";
import { Chat } from "@/types/chat";
import { useUserStore } from "@/store/userStore";

export const useGetHistory = () => {
  const user = useUserStore((state) => state.user);
  const currentUser = useUserStore((state) => state.currentUser);
  const [history, setHistory] = useState<Chat[]>([]);

  useEffect(() => {
    const fetchHistory = async () => {
      if (currentUser && user) {
        const response = await historyAction(currentUser.id, user.id);

        if (response) {
          setHistory(response);
        }
      }
    };

    fetchHistory();
  }, [currentUser, user]);

  return { history };
};
