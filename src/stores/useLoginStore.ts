import { create } from "zustand";
import { persist } from "zustand/middleware";

interface UserState {
  isLogin: boolean;
  login_id: string;
  user_name: string;
  user_role: string;
}

interface useLoginStoreState {
  userState: UserState;
  setUserState: (newState: UserState) => void;
}

const useLoginStore = create(
  persist<useLoginStoreState>(
    (set) => ({
      userState: {
        isLogin: false,
        login_id: "",
        user_name: "",
        user_role: "",
      },
      setUserState: (newState) => set({ userState: newState }),
    }),
    {
      name: "user-storage",
    },
  ),
);

export default useLoginStore;
