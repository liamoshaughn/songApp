import axios from 'axios';

import { fc } from '../firebase/firebase';
import { httpsCallable } from 'firebase/functions';
import { useMutation } from '@tanstack/react-query';

export const getUser = async (token) => {
  var config = {
    method: 'get',
    url: 'https://api.spotify.com/v1/me',
    headers: {
      Authorization: 'Bearer ' + token,
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
    method: 'get',
    url: 'https://api.spotify.com/v1/users/' + userId + '/playlists?limit=49',
    headers: {
      Authorization: 'Bearer ' + token,
    },
  };

  const response = await axios(config).catch(function (error) {
    return error;
  });
  return response.data;
};

export const addToPlaylist = async (playlistId, songUri, token) => {
  var config = {
    method: 'post',
    url: 'https://api.spotify.com/v1/playlists/' + playlistId + '/tracks?uris=' + songUri,
    headers: {
      Authorization: 'Bearer ' + token,
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
    method: 'get',
    url:
      'https://api.spotify.com/v1/search?include_external=audio&q="track:' +
      song +
      ',artist:' +
      artist +
      ',year:' +
      year +
      '"&type=track&limit=1&market=AU',
    headers: {
      Authorization: 'Bearer ' + token,
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
    method: 'get',
    url:
      'https://api.spotify.com/v1/search?include_external=audio&q="track:' + query + '"&type=track&limit=10&market=AU',
    headers: {
      Authorization: 'Bearer ' + token,
    },
  };
  const response = await axios(config).catch(function (error) {
    return error;
  });
  return response.data;
};

export const sendMessage = async ({ message, name }) => {
  // Call the Firebase Function using Axios

  const sendMessageFirestore = httpsCallable(fc, 'addMessage');
  return await sendMessageFirestore({ message: message, name: name })
    .then((result) => {
      console.log(result.data);
      return result.data.access_token;
    })
    .catch((error) => {
      console.log('error');
      return error;
    });
};

export const usePostMessageMutation = () =>
  useMutation({
    mutationFn: (message) => {
      return sendMessage(message);
    },
  });

export const getClientAuth = async () => {
  const spotifyLogin = httpsCallable(fc, 'clientAuth');
  return spotifyLogin()
    .then((result) => {
      console.log(result.data);
      return result.data.access_token;
    })
    .catch((error) => {
      console.error(error);
    });
};
