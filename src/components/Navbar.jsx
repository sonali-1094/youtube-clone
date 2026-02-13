import React, { useState } from 'react';
import './Navbar.css';
import { FaSearch, FaYoutube } from 'react-icons/fa';
import { IoMdNotificationsOutline } from 'react-icons/io';
import { MdMoreVert } from 'react-icons/md';
import { FiUpload } from 'react-icons/fi';
import { CgProfile } from 'react-icons/cg';
import MenuIcon from './MenuIcon';

import { useNavigate } from 'react-router-dom';

const Navbar = ({ onMenuClick }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const handleSearch = (event) => {
    event.preventDefault();

    const trimmedQuery = searchTerm.trim();
    if (!trimmedQuery) return;

    navigate(`/search/${encodeURIComponent(trimmedQuery)}`);
  };

  return (
    <nav className="navbar">
      <div className="nav-left">
        <MenuIcon onClick={onMenuClick} />
        <button type="button" className="brand-btn" onClick={() => navigate('/')}>
          <FaYoutube className="youtube-icon" />
          <span className="logo-text">YouTube Clone</span>
        </button>
      </div>

      <form className="nav-middle" onSubmit={handleSearch}>
        <input
          type="text"
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
          placeholder="Search videos, creators, topics"
          aria-label="Search videos"
        />
        <button type="submit" className="search-btn" aria-label="Search">
          <FaSearch className="search-icon" />
        </button>
      </form>

      <div className="nav-right">
        <button type="button" className="icon-btn" aria-label="Upload video">
          <FiUpload className="icon" />
        </button>
        <button type="button" className="icon-btn" aria-label="Notifications">
          <IoMdNotificationsOutline className="icon" />
        </button>
        <button type="button" className="icon-btn" aria-label="More options">
          <MdMoreVert className="icon" />
        </button>
        <button type="button" className="icon-btn" aria-label="Profile">
          <CgProfile className="icon" />
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
