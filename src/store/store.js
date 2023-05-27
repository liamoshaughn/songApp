import { create } from 'zustand';
import colours from '../theme/colours.json';
import typography from '../theme/typography.json';

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
  addProfile: (user) =>
    set((state) => {
      return { userProfile: user };
    }),
}));

export const useSettings = create((set) => ({
  theme: { colours: colours, typography: typography },
  addTheme: (theme) =>
    set((state) => {
      return { theme: theme };
    }),
}));

export function addToken(token) {
  useStore.getState().addAccess(token);
}

export function addUser(user) {
  useStore.getState().addProfile(user);
}

export const useSongStore = create((set) => ({
  playlistId: '',

  addPlaylist: (id) =>
    set((state) => {
      return { playlistId: id };
    }),
}));

export function addPlaylistId(id) {
  useSongStore.getState().addPlaylist(id);
}
