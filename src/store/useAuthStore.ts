import { create } from "zustand";
import { User } from "../types";

interface UserState {
  user: User | null;
  userLoading: boolean;
  setUser: (user: User) => void;
  logout: () => void;
}

export const useAuthStore = create<UserState>((set) => ({
  user: null,
  userLoading: true, // start as loading
  setUser: (user) => set({ user }),
  logout: () => set({ user: null }),
}));
