import React, { useEffect, useState } from 'react';
import './Home.css';
import VideoCard from '../../components/VideoCard';
import { fetchVideosByQuery, parseYoutubeError } from '../../lib/youtube';

const Home = ({ selectedCategory }) => {
  const [videos, setVideos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadVideos = async () => {
      setIsLoading(true);
      setError('');

      try {
        const categoryQuery = selectedCategory === 'Home' ? 'Popular on YouTube' : selectedCategory;
        const items = await fetchVideosByQuery(categoryQuery, { maxResults: 16 });
        setVideos(items);
      } catch (err) {
        setError(parseYoutubeError(err));
      } finally {
        setIsLoading(false);
      }
    };

    loadVideos();
  }, [selectedCategory]);

  return (
    <section className="home">
      <header className="home-hero">
        <p className="hero-label">Now Discovering</p>
        <h1>{selectedCategory} Videos</h1>
        <p>Fresh picks and creator stories curated around your selected topic.</p>
      </header>

      {isLoading && <div className="status-card">Loading videos...</div>}
      {error && <div className="status-card error">{error}</div>}

      {!isLoading && !error && (
        <div className="video-grid">
          {videos.map((video) => (
            <VideoCard key={video.id.videoId || video.id} video={video} />
          ))}
        </div>
      )}
    </section>
  );
};

export default Home;
