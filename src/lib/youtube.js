import axios from 'axios';

const API_BASE_URL = 'https://www.googleapis.com/youtube/v3';
const API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY;

const youtubeClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
});

const withDefaults = (params = {}) => ({
  maxResults: 12,
  key: API_KEY,
  ...params,
});

const ensureApiKey = () => {
  if (!API_KEY) {
    throw new Error('Missing VITE_YOUTUBE_API_KEY in .env');
  }
};

export const fetchVideosByQuery = async (query, extraParams = {}) => {
  ensureApiKey();

  const { data } = await youtubeClient.get('/search', {
    params: withDefaults({
      part: 'snippet',
      q: query,
      type: 'video',
      ...extraParams,
    }),
  });

  return data.items ?? [];
};

export const fetchVideoDetails = async (videoId) => {
  ensureApiKey();

  const { data } = await youtubeClient.get('/videos', {
    params: withDefaults({
      part: 'snippet,statistics',
      id: videoId,
      maxResults: 1,
    }),
  });

  return data.items?.[0] ?? null;
};

export const parseYoutubeError = (error) => {
  if (!API_KEY) {
    return 'YouTube API key is missing. Add VITE_YOUTUBE_API_KEY to .env';
  }

  return (
    error?.response?.data?.error?.message ||
    error?.message ||
    'Something went wrong while loading videos.'
  );
};
