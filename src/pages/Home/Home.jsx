import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Home.css';
import VideoCard from '../../components/VideoCard';

const API_KEY = 'AIzaSyB45v9fhe2d4sZl5z6O0ECUtsiGgF9korw';

const Home = ({ selectedCategory }) => {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    axios
      .get('https://www.googleapis.com/youtube/v3/search', {
        params: {
          part: 'snippet',
          maxResults: 12,
          q: selectedCategory, // 🟢 Dynamic category
          key: API_KEY,
          type: 'video',
        },
      })
      .then((res) => setVideos(res.data.items))
      .catch((err) => console.error(err));
  }, [selectedCategory]); // 🟢 Triggers re-fetch on category change

  return (
    <div className="home">
      <h2>{selectedCategory} Videos</h2>
      <div className="video-grid">
        {videos.map((video) => (
          <VideoCard key={video.id.videoId || video.id.channelId} video={video} />
        ))}
      </div>
    </div>
  );
};

export default Home;
