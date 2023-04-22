import axios from "axios";

import { Buffer } from "buffer";

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

export const sendMessage = async (message) => {
  console.log(message);
  // Call the Firebase Function using Axios
  const response = await axios
    .post("https://australia-southeast1-songapp-384011.cloudfunctions.net/addMessage", {
      data: message,
    })
    .catch(function (error) {
      console.log(error);
    });

  return response;
};

export const getClientAuth = async () => {
  const spotify_client_id = "5a6369619e834e6fba2caaeca458f030";
  const spotify_client_secret = "51617b77f471429399dcaba5cbdd0097";
  const authOptions = {
    url: "https://accounts.spotify.com/api/token",
    method: "post",

    headers: {
      Authorization: "Basic " + Buffer.from(spotify_client_id + ":" + spotify_client_secret).toString("base64"),
      "Content-Type": "application/x-www-form-urlencoded",
    },
    data: {
      grant_type: "client_credentials",
    },
  };

  const response = await axios(authOptions).catch((error) => {
    console.log(error);
  });

  return response.data.access_token;
};
