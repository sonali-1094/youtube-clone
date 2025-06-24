import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import './App.css';

import Home from './pages/Home/Home';
import VideoPage from './pages/Video/VideoPage';
import SearchResults from './pages/Search/SearchResult';

const App = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');

  return (
    <>
      <Navbar />
      <div className="main-layout">
        {/* Sidebar with category handler */}
        <Sidebar
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
        />

        <div className="content">
          <Routes>
            {/* Pass selectedCategory to Home */}
            <Route path="/" element={<Home selectedCategory={selectedCategory} />} />
            <Route path="/video/:id" element={<VideoPage />} />
            <Route path="/search/:query" element={<SearchResults />} />
          </Routes>
        </div>
      </div>
    </>
  );
};

export default App;
