import { create } from "zustand";

export const useStore = create((set) => ({
  accessToken: "",
  userProfile: "",
  addAccess: (token) =>
    set((state) => {
      return { accessToken: token };
    }),
  addProfile: (user) =>
    set((state) => {
      return { userProfile: user };
    }),
}));

export function addToken(token) {
  useStore.getState().addAccess(token);
}
export function addUser(user) {
  useStore.getState().addProfile(user);
}

export const useSongStore = create((set) => ({
  playlistId: "",

  addPlaylist: (id) =>
    set((state) => {
      return { playlistId: id };
    }),
}));

export function addPlaylistId(id) {
  useSongStore.getState().addPlaylist(id);
}
