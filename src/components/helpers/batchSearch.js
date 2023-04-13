import { searchSongs } from "../../services/api";
import songs from "../../data/songData.json";
import Bottleneck from "bottleneck";

const limiter = new Bottleneck({
  maxConcurrent: 5,
  minTime: 100,
});

const callSearch = limiter.wrap(
  async (song, token) => {
    const data = await searchSongs({ song: song._Name, artist: song._Artist, year: song._Year }, token);
    return data;
  },
  {
    // Define backoff-retry options
    retry: async (error, attempt) => {
      // Retry on 429 (rate limit exceeded) and 503 (service unavailable) errors
      if ([429, 503].includes(error.response?.status) && attempt <= 3) {
        console.log(`Rate limit exceeded. Retrying after ${Math.pow(2, attempt)} seconds.`);
        return Math.pow(2, attempt) * 1000; // Backoff exponentially
      }
      throw error; // Throw error for other status codes or too many retries
    },
  }
);

export async function batchSearch(token) {
  const requests = Object.values(songs).map((song) => callSearch(song, token));
  const results = await Promise.all(requests);
  console.log(results);
}
