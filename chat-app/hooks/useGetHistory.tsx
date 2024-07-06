import { useState, useEffect } from "react";
import { historyAction } from "@/actions/historyAction";
import { Chat } from "@/types/chat";
import { useUserStore } from "@/store/userStore";

export const useGetHistory = () => {
  const user = useUserStore((state) => state.user);
  const [history, setHistory] = useState<Chat[]>([]);

  useEffect(() => {
    const fetchHistory = async () => {
      if (user) {
        const response = await historyAction(user.id);

        if (response) {
          setHistory(response);
        }
      }
    };

    fetchHistory();
  }, [user]);

  return { history };
};
