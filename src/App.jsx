import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import './App.css';

// Pages
import Home from './pages/Home/Home';
import VideoPage from './pages/Video/VideoPage';
import SearchResults from './pages/Search/SearchResult';

// Clerk imports
import {
  SignIn,
  SignUp,
  SignedIn,
  SignedOut,
  RedirectToSignIn
} from '@clerk/clerk-react';

const App = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');

  return (
    <>
      <Navbar />
      <div className="main-layout">
        {/* Sidebar only visible after login */}
        <SignedIn>
          <Sidebar
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
          />
        </SignedIn>

        <div className="content">
          <Routes>
            {/* Clerk Authentication Routes */}
            <Route path="/sign-in/*" element={<SignIn routing="path" path="/sign-in" />} />
            <Route path="/sign-up/*" element={<SignUp routing="path" path="/sign-up" />} />

            {/* Protected Routes */}
            <Route
              path="/"
              element={
                <SignedIn>
                  <Home selectedCategory={selectedCategory} />
                </SignedIn>
              }
            />
            <Route
              path="/video/:id"
              element={
                <SignedIn>
                  <VideoPage />
                </SignedIn>
              }
            />
            <Route
              path="/search/:query"
              element={
                <SignedIn>
                  <SearchResults />
                </SignedIn>
              }
            />

            {/* Redirect all unknown routes to sign in */}
            <Route
              path="*"
              element={
                <SignedOut>
                  <RedirectToSignIn />
                </SignedOut>
              }
            />
          </Routes>
        </div>
      </div>
    </>
  );
};

export default App;
