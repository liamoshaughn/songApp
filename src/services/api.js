import axios from "axios";
import { redirect } from "react-router-dom";
import Cookies from "universal-cookie";
import { addToken, useStore } from "../store/store";

const cookies = new Cookies();
export const axiosInst = axios.create({ baseURL: "http://localhost:3005" });

export const getToken = async () => {
  console.log("getting token");
  const response = await axiosInst(`/auth/token`)
    .then((r) => {
      return r;
    })
    .catch((err) => {
      console.log("error: ", err);
      throw err;
    });
  // console.log(response);
  const json = await response.data;
  console.log(json);

  cookies.set("access_token", json.access_token, { path: "/" });
  window.location.href = "/";
};

export const callback = async () => {
  console.log("Calling callback");
  const queryParameters = new URLSearchParams(window.location.search);
  const code = queryParameters.get("code");
  const response = await fetch("http://localhost:3005/auth/callback?code=" + code);
  console.log(response);
  getToken();
};

export const login = async () => {
  console.log("beginning login");
  window.location.href = "http://localhost:3005/auth/login";
  return null;
};

export const getUser = async (token) => {
  var config = {
    method: "get",
    url: "https://api.spotify.com/v1/me",
    headers: {
      Authorization: "Bearer " + token,
    },
  };

  const response = await axios(config).catch(function (error) {
    return error;
  });
  return response.data;
};

export const getUserPlaylists = async (data, token) => {
  var userId = data;
  var config = {
    method: "get",
    url: "https://api.spotify.com/v1/users/" + userId + "/playlists?limit=49",
    headers: {
      Authorization: "Bearer " + token,
    },
  };

  const response = await axios(config).catch(function (error) {
    return error;
  });
  return response.data;
};

export const addToPlaylist = async (playlistId, songUri, token) => {
  var config = {
    method: "post",
    url: "https://api.spotify.com/v1/playlists/" + playlistId + "/tracks?uris=" + songUri,
    headers: {
      Authorization: "Bearer " + token,
    },
  };
  const response = await axios(config).catch(function (error) {
    return error;
  });
  return response.data;
};

export const searchSongs = async (data, token) => {
  const song = data.song;
  const artist = data.artist;
  const year = data.year;
  var config = {
    method: "get",
    url:
      'https://api.spotify.com/v1/search?include_external=audio&q="track:' +
      song +
      ",artist:" +
      artist +
      ",year:" +
      year +
      '"&type=track&limit=1&market=AU',
    headers: {
      Authorization: "Bearer " + token,
    },
  };

  const response = await axios(config).catch(function (error) {
    return error;
  });
  return response.data;
};

export const searchBarSong = async (data, token) => {
  const query = data;

  var config = {
    method: "get",
    url:
      'https://api.spotify.com/v1/search?include_external=audio&q="track:' + query + '"&type=track&limit=10&market=AU',
    headers: {
      Authorization: "Bearer " + token,
    },
  };
  const response = await axios(config).catch(function (error) {
    return error;
  });
  return response.data;
};
