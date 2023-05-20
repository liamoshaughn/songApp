import { create } from 'zustand';
import colours from "../theme/colours.json"
import typography from "../theme/typography.json"

export const useStore = create((set) => ({
  accessToken: '',
  userProfile: '',
  addAccess: (token) =>
    set((state) => {
      return { accessToken: token };
    }),
  name: '',
  setName: (val) => {
    set((state) => {
      return { name: val };
    });
  },
}));

export const useSettings = create((set) => ({
  theme: { colours: colours, typography: typography},
  addTheme: (theme) =>
    set((state) => {
      return { theme: theme };
    }),
}));

export function addToken(token) {
  useStore.getState().addAccess(token);
}
