import { create } from "zustand";
import { persist } from "zustand/middleware";

type State = {
    token: string
    isAuth: boolean
    role: string
}
type Actions = {
    setToken: (token: string, role: string) => void
    logout: () => void
}

export const useAuthStore = create(persist<State & Actions>(
    (set) => ({
        token: "",
        isAuth: false,
        role: "",
        setToken: (token: string, role: string) => set(state => ({
            token,
            role,
            isAuth: true,
        })),
        logout: () => set(state => ({
            token: "",
            role: "",
            isAuth: false
        }))
    }), {
    name: "auth"
}
));
