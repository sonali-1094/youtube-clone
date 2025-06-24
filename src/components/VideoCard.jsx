import React from 'react';
import { Link } from 'react-router-dom';
import './VideoCard.css';

const VideoCard = ({ video }) => {
  const { videoId } = video.id;
  const { title, thumbnails, channelTitle } = video.snippet;

  return (
    <Link to={`/video/${videoId}`} className="video-card">
      <img src={thumbnails.medium.url} alt={title} />
      <div className="video-info">
        <h4>{title}</h4>
        <p>{channelTitle}</p>
      </div>
    </Link>
  );
};

export default VideoCard;
