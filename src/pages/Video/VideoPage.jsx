import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './VideoPage.css';

const API_KEY = 'AIzaSyB45v9fhe2d4sZl5z6O0ECUtsiGgF9korw';

const VideoPage = () => {
  const { id } = useParams();
  const [videoData, setVideoData] = useState(null);

  useEffect(() => {
    axios
      .get('https://www.googleapis.com/youtube/v3/videos', {
        params: {
          part: 'snippet',
          id: id,
          key: API_KEY,
        },
      })
      .then((res) => {
        setVideoData(res.data.items[0]);
      })
      .catch((err) => console.error(err));
  }, [id]);

  if (!videoData) return <div className="loading">Loading...</div>;

  const { title, description, channelTitle } = videoData.snippet;

  return (
    <div className="video-page">
      <div className="video-container">
        <iframe
          src={`https://www.youtube.com/embed/${id}`}
          frameBorder="0"
          allowFullScreen
          title={title}
        ></iframe>
      </div>

      <div className="video-details">
        <h2>{title}</h2>
        <p className="channel-name">{channelTitle}</p>
        <p className="description">{description}</p>
      </div>
    </div>
  );
};

export default VideoPage;
