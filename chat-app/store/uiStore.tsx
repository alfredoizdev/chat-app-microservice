import { create } from "zustand";
import { devtools } from "zustand/middleware";

type UiState = {
  uiLoading: boolean;
  setUiLoading: (loading: boolean) => void;
};

export const useUIStore = create<UiState>()(
  devtools((set) => ({
    uiLoading: false,
    setUiLoading: (loading: boolean) => set({ uiLoading: loading }),
  }))
);
