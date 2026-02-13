import React, { useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import VideoCard from '../../components/VideoCard';
import './SearchResult.css';
import { fetchVideosByQuery, parseYoutubeError } from '../../lib/youtube';

const SearchResults = () => {
  const { query } = useParams();
  const decodedQuery = useMemo(() => decodeURIComponent(query || ''), [query]);

  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadResults = async () => {
      setIsLoading(true);
      setError('');

      try {
        const items = await fetchVideosByQuery(decodedQuery, { maxResults: 18 });
        setResults(items);
      } catch (err) {
        setError(parseYoutubeError(err));
      } finally {
        setIsLoading(false);
      }
    };

    loadResults();
  }, [decodedQuery]);

  return (
    <section className="search-results">
      <header className="search-header">
        <p className="search-label">Search</p>
        <h1>{decodedQuery}</h1>
        {!isLoading && !error && <p>{results.length} videos found</p>}
      </header>

      {isLoading && <div className="status-card">Loading search results...</div>}
      {error && <div className="status-card error">{error}</div>}

      {!isLoading && !error && results.length === 0 && (
        <div className="status-card">No videos found for this query.</div>
      )}

      {!isLoading && !error && results.length > 0 && (
        <div className="video-grid">
          {results.map((video) => (
            <VideoCard key={video.id.videoId || video.id} video={video} />
          ))}
        </div>
      )}
    </section>
  );
};

export default SearchResults;
