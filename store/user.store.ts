import { create } from "zustand";
import { set } from "date-fns";

export type UserInfo = {
    name: string;
    user_id: string;
    email: string;
    rol: string;
    user_is_active: boolean;
}

type UserStore = {
    user: UserInfo | null;
    estaVerificado: boolean;
    setUserInfo: (userInfo: UserInfo) => void;
    clearUserInfo: () => void;
}

export const useUserStore = create<UserStore>((set) => ({
    user: null,
    estaVerificado: false,
    setUserInfo: (userInfo: UserInfo) => {
        set({ user: userInfo, estaVerificado: true });
    },
    clearUserInfo: () => set({ user: null }),
}));