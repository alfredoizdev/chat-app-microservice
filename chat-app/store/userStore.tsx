import { User } from "@/types/user";
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

type UserState = {
  user: User | null;
  currentUser: User | null;
  setUser: (user: User) => void;
  setCurrentUser: (user: User | null) => void;
};

export const useUserStore = create<UserState>()(
  devtools(
    persist(
      (set) => ({
        user: null,
        currentUser: null,
        setUser: (user: User) => set({ user }),
        setCurrentUser: (currentUser: User | null) => set({ currentUser }),
      }),
      {
        name: "user-storage",
      }
    )
  )
);
