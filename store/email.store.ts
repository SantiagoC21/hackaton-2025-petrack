import { create } from "zustand";

type EmailState = {
  email: string;
  setEmail: (email: string) => void;
};

const useEmailStore = create<EmailState>((set) => {
  return {
    email: "",
    setEmail: (email: string) => {
      set({ email });
    },
  };
});

export default useEmailStore;
