import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import VideoCard from '../../components/VideoCard';
import './SearchResult.css';

const API_KEY = 'AIzaSyB45v9fhe2d4sZl5z6O0ECUtsiGgF9korw';

const SearchResults = () => {
  const { query } = useParams();
  const [results, setResults] = useState([]);

  useEffect(() => {
    axios
      .get('https://www.googleapis.com/youtube/v3/search', {
        params: {
          part: 'snippet',
          maxResults: 12,
          q: query,
          key: API_KEY,
          type: 'video',
        },
      })
      .then((res) => setResults(res.data.items))
      .catch((err) => console.error(err));
  }, [query]);

  return (
    <div className="search-results">
      <h2>Search Results for "{query}"</h2>
      <div className="video-grid">
        {results.map((video) => (
          <VideoCard key={video.id.videoId} video={video} />
        ))}
      </div>
    </div>
  );
};

export default SearchResults;
