import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import './App.css';

import Home from './pages/Home/Home';
import VideoPage from './pages/Video/VideoPage';
import SearchResults from './pages/Search/SearchResult';

import {
  SignIn,
  SignUp,
  SignedIn,
  SignedOut,
  RedirectToSignIn,
} from '@clerk/clerk-react';

const ProtectedRoute = ({ children }) => (
  <>
    <SignedIn>{children}</SignedIn>
    <SignedOut>
      <RedirectToSignIn />
    </SignedOut>
  </>
);

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
        <SignedIn>
          <Sidebar
            selectedCategory={selectedCategory}
            onSelectCategory={handleCategorySelect}
            isOpen={isSidebarOpen}
            onClose={() => setSidebarOpen(false)}
          />
          {isSidebarOpen && <button className="sidebar-backdrop" onClick={() => setSidebarOpen(false)} aria-label="Close sidebar" />}
        </SignedIn>

        <main className="content">
          <Routes>
            <Route path="/sign-in/*" element={<SignIn routing="path" path="/sign-in" />} />
            <Route path="/sign-up/*" element={<SignUp routing="path" path="/sign-up" />} />

            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <Home selectedCategory={selectedCategory} />
                </ProtectedRoute>
              }
            />
            <Route
              path="/video/:id"
              element={
                <ProtectedRoute>
                  <VideoPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/search/:query"
              element={
                <ProtectedRoute>
                  <SearchResults />
                </ProtectedRoute>
              }
            />

            <Route path="*" element={<RedirectToSignIn />} />
          </Routes>
        </main>
      </div>
    </div>
  );
};

export default App;
