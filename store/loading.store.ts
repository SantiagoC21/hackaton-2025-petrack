import { create } from "zustand";

type LoadingState = {
  show: boolean;
  message: string;
  showLoading: (message: string) => void;
  hideLoading: () => void;
};

const useLoadingStore = create<LoadingState>((set) => ({
  show: false,
  message: "",
  showLoading: (message: string) => set({ show: true, message }),
  hideLoading: () => set({ show: false }),
}));
export default useLoadingStore;
