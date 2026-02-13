import React from 'react';
import { Link } from 'react-router-dom';
import './VideoCard.css';
import { formatRelativeDate } from '../utils/formatters';

const VideoCard = ({ video }) => {
  const videoId = video?.id?.videoId || video?.id;
  const snippet = video?.snippet;

  if (!videoId || !snippet) return null;

  const { title, thumbnails, channelTitle, publishedAt } = snippet;
  const thumbnail = thumbnails?.high?.url || thumbnails?.medium?.url || thumbnails?.default?.url;

  return (
    <Link to={`/video/${videoId}`} className="video-card">
      <div className="video-thumb-wrap">
        <img src={thumbnail} alt={title} loading="lazy" className="video-thumb" />
      </div>
      <div className="video-info">
        <h3>{title}</h3>
        <p className="video-channel">{channelTitle}</p>
        <p className="video-time">{formatRelativeDate(publishedAt)}</p>
      </div>
    </Link>
  );
};

export default VideoCard;
