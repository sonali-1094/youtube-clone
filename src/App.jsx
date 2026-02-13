import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import './App.css';

import Home from './pages/Home/Home';
import VideoPage from './pages/Video/VideoPage';
import SearchResults from './pages/Search/SearchResult';

const App = () => {
  const [selectedCategory, setSelectedCategory] = useState('Trending');
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setSidebarOpen(false);
  };

  return (
    <div className="app-shell">
      <Navbar onMenuClick={() => setSidebarOpen((prev) => !prev)} />

      <div className="main-layout">
        <Sidebar
          selectedCategory={selectedCategory}
          onSelectCategory={handleCategorySelect}
          isOpen={isSidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />
        {isSidebarOpen && <button className="sidebar-backdrop" onClick={() => setSidebarOpen(false)} aria-label="Close sidebar" />}

        <main className="content">
          <Routes>
            <Route path="/" element={<Home selectedCategory={selectedCategory} />} />
            <Route path="/video/:id" element={<VideoPage />} />
            <Route path="/search/:query" element={<SearchResults />} />
            <Route path="*" element={<Home selectedCategory={selectedCategory} />} />
          </Routes>
        </main>
      </div>
    </div>
  );
};

export default App;
