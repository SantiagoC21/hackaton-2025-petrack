import { create } from "zustand";

type NotificationState = {
  show: boolean;
  success: boolean;
  message: string;
  showNotification: (success: boolean, message: string) => void;
  hideNotification: () => void;
};

const useNotificationStore = create<NotificationState>((set) => ({
  show: false,
  success: true,
  message: "",
  showNotification: (success, message) => set({ show: true, success, message }),
  hideNotification: () => set({ show: false }),
}));

export default useNotificationStore;
