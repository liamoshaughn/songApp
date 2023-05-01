import { create } from "zustand";

export const useStore = create((set) => ({
  accessToken: "",
  userProfile: "",
  addAccess: (token) =>
    set((state) => {
      return { accessToken: token };
    }),
  name: "",
  setName: (val) => {
    set((state) => {
      return { name: val }
    })
  }
}));

export function addToken(token) {
  useStore.getState().addAccess(token);
}
