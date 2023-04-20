import { create } from "zustand";

export const useStore = create((set) => ({
  accessToken: "",
  userProfile: "",
  addAccess: (token) =>
    set((state) => {
      return { accessToken: token };
    }),
}));

export function addToken(token) {
  useStore.getState().addAccess(token);
}
