import axios from 'axios';
import Cookies from 'universal-cookie';
import { useMutation } from '@tanstack/react-query';
import { fc } from '../firebase/firebase';
import { httpsCallable } from 'firebase/functions';

const cookies = new Cookies();
let callbackCalled = false;
const options = { sameSite: 'lax', path: '/' };
// Create an Axios instance
const HostSpotifyApi = axios.create({
  baseURL: 'https://api.spotify.com/v1',
  headers: {
    'Content-Type': 'application/json',
  },
});

const UserSpotifyApi = axios.create({
  baseURL: 'https://api.spotify.com/v1',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor
HostSpotifyApi.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem('access_token');
    if (accessToken) {  
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

UserSpotifyApi.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem('access_token');
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Add response interceptor
UserSpotifyApi.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const newAccessToken = await getClientAuth();

        // Update the access token and retry the original request
         localStorage.setItem('access_token', newAccessToken);
        const newRequest = { ...originalRequest };
        newRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return UserSpotifyApi(newRequest);
      } catch (error) {
        // Handle error

        return Promise.reject(error);
      }
    }

    return Promise.reject(error);
  }
);

HostSpotifyApi.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = localStorage.getItem('refresh_token');
        const newAccessToken = await refreshSpotifyAccess(refreshToken);

        // Update the access token and retry the original request
         localStorage.setItem('access_token', newAccessToken);
        const newRequest = { ...originalRequest };
        newRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return HostSpotifyApi(newRequest);
      } catch (error) {
        // Handle error
        console.log(error);
        return Promise.reject(error);
      }
    }

    return Promise.reject(error);
  }
);

export const callback = async () => {
  if (callbackCalled) {
    return;
  }
  callbackCalled = true;
  const queryParameters = new URLSearchParams(window.location.search);
  const code = queryParameters.get('code');
  const spotifyCallback = httpsCallable(fc, 'spotifyCallback');
  spotifyCallback({ code: code })
    .then((result) => {
      const json = result.data;
       localStorage.setItem('access_token', json.access_token);
      localStorage.setItem('refresh_token', json.refresh_token);
      window.location.href = '/host';
    })
    .catch((error) => {
      console.error(error);
    });
};

export const login = async () => {
  const spotifyLogin = httpsCallable(fc, 'spotifyLogin');
  spotifyLogin()
    .then((result) => {
      window.location.href = result.data;
    })
    .catch((error) => {
      console.error(error);
    });
};

export const createSession = async () => {
  const createSession = httpsCallable(fc, 'createSession');
  return await createSession()
    .then((result) => {
      return result.data;
    })
    .catch((error) => {
      console.error(error);
    });
};

export const refreshSpotifyAccess = async (refreshToken) => {
  const refreshSpotifyAccessToken = httpsCallable(fc, 'refreshSpotifyAccessToken');

  return await refreshSpotifyAccessToken({ refreshToken: refreshToken })
    .then((result) => {
      return result.data.accessToken;
    })
    .catch((error) => {
      console.error(error);
    });
};

export const getUser = async () => {
  
  const accessToken = localStorage.getItem('access_token');
  if ((accessToken ?? '') !== '' && accessToken.length >= 10) {
    const response = await HostSpotifyApi.get('/me').catch(function (error) {
      console.log(error)
      return error;
    });
    return response.data;
  }
};

export const getUserPlaylists = async (data, offset) => {
  const response = await HostSpotifyApi.get(`/users/${data}/playlists?limit=49&offset=${offset}`).catch(function (
    error
  ) {
    return error;
  });

  let extraPlaylists = [];

  if (response.data.items.length === response.data.limit) {
    const nextSongs = response.data.limit;
    extraPlaylists = await getUserPlaylists(data, nextSongs);
  }

  const { items } = response.data;
  const { items: extraItems } = extraPlaylists;

  const finalResponse = extraItems ? [...items, ...extraItems] : items;

  return { items: finalResponse };
};

export const addToPlaylist = async (playlistId, songUri) => {
  try {
    const response = await HostSpotifyApi.post('/playlists/' + playlistId + '/tracks?uris=' + songUri);
    return response.data;
  } catch (error) {
    console.log(error);
    throw new Error('Failed to add track to playlist');
  }
};

export const usePlaylistMutation = () =>
  useMutation({
    mutationFn: (message) => {
      return addToPlaylist(message);
    },
  });

export const addToQueue = async (songUri) => {
  try {
    const response = await HostSpotifyApi.post('/me/player/queue?uri=' + songUri);
    return response.data;
  } catch (error) {
    console.log(error);
    throw new Error('Failed to add track to queue');
  }
};

export const useQueueMutation = () =>
  useMutation({
    mutationFn: (message) => {
      return addToQueue(message);
    },
  });

export const searchBarSong = async (data) => {
  const query = data;

  const response = await UserSpotifyApi.get(
    `/search?include_external=audio&q="${query}"&type=track&limit=10&market=AU`
  ).catch(function (error) {
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

export const sendMessage = async ({ message, name, session }) => {
  // Call the Firebase Function using Axios

  const sendMessageFirestore = httpsCallable(fc, 'addRequest');
  return await sendMessageFirestore({ trackID: message, name: name, session: session })
    .then((result) => {
      return result.data.access_token;
    })
    .catch((error) => {
      console.log('error');
      throw new Error('failed to add song');
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
      return result.data.access_token;
    })
    .catch((error) => {
      console.error(error);
    });
};
