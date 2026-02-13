import React, { useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import './VideoPage.css';
import VideoCard from '../../components/VideoCard';
import { fetchVideoDetails, fetchVideosByQuery, parseYoutubeError } from '../../lib/youtube';
import { formatCompactNumber, formatRelativeDate } from '../../utils/formatters';

const VideoPage = () => {
  const { id } = useParams();
  const [videoData, setVideoData] = useState(null);
  const [relatedVideos, setRelatedVideos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadVideo = async () => {
      setIsLoading(true);
      setError('');

      try {
        const details = await fetchVideoDetails(id);
        if (!details) {
          setError('Video not found.');
          setVideoData(null);
          setRelatedVideos([]);
          return;
        }

        setVideoData(details);

        const related = await fetchVideosByQuery(details.snippet.title, { maxResults: 8 });
        setRelatedVideos(related.filter((item) => (item.id.videoId || item.id) !== id));
      } catch (err) {
        setError(parseYoutubeError(err));
      } finally {
        setIsLoading(false);
      }
    };

    loadVideo();
  }, [id]);

  const videoStats = useMemo(() => {
    if (!videoData?.statistics) return 'Stats unavailable';

    const views = formatCompactNumber(videoData.statistics.viewCount);
    const likes = formatCompactNumber(videoData.statistics.likeCount);
    return `${views} views · ${likes} likes`;
  }, [videoData]);

  if (isLoading) return <div className="status-card">Loading video...</div>;
  if (error) return <div className="status-card error">{error}</div>;
  if (!videoData) return null;

  const { title, description, channelTitle, publishedAt } = videoData.snippet;

  return (
    <section className="video-page">
      <article className="video-main">
        <div className="video-container">
          <iframe
            src={`https://www.youtube.com/embed/${id}`}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title={title}
          />
        </div>

        <div className="video-details">
          <h1>{title}</h1>
          <p className="video-stats">{videoStats}</p>
          <p className="channel-name">{channelTitle}</p>
          <p className="published-time">Published {formatRelativeDate(publishedAt)}</p>
          <p className="description">{description}</p>
        </div>
      </article>

      <aside className="video-related">
        <h2>Related Videos</h2>
        <div className="related-list">
          {relatedVideos.map((video) => (
            <VideoCard key={video.id.videoId || video.id} video={video} />
          ))}
        </div>
      </aside>
    </section>
  );
};

export default VideoPage;
