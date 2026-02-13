import React from 'react';
import './Sidebar.css';
import { useNavigate } from 'react-router-dom';

import { AiFillHome } from 'react-icons/ai';
import { FaCar, FaGamepad, FaMusic, FaBlog, FaThumbsUp, FaHistory } from 'react-icons/fa';
import { MdOutlineMovie, MdSportsCricket, MdTrendingUp } from 'react-icons/md';
import { FiMonitor } from 'react-icons/fi';
import { BsNewspaper } from 'react-icons/bs';

const categories = [
  { name: 'Trending', icon: <MdTrendingUp /> },
  { name: 'Home', icon: <AiFillHome /> },
  { name: 'History', icon: <FaHistory /> },
  { name: 'Liked Videos', icon: <FaThumbsUp /> },
  { name: 'Games', icon: <FaGamepad /> },
  { name: 'Automobiles', icon: <FaCar /> },
  { name: 'Sports', icon: <MdSportsCricket /> },
  { name: 'Entertainment', icon: <MdOutlineMovie /> },
  { name: 'Technology', icon: <FiMonitor /> },
  { name: 'Music', icon: <FaMusic /> },
  { name: 'Blogs', icon: <FaBlog /> },
  { name: 'News', icon: <BsNewspaper /> },
];

const Sidebar = ({ selectedCategory, onSelectCategory, isOpen, onClose }) => {
  const navigate = useNavigate();

  const handleSelect = (categoryName) => {
    onSelectCategory(categoryName);
    navigate('/');
    onClose();
  };

  return (
    <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
      <h3 className="sidebar-title">Discover</h3>
      <div className="sidebar-items">
        {categories.map((cat) => (
          <button
            key={cat.name}
            type="button"
            className={`sidebar-item ${selectedCategory === cat.name ? 'active' : ''}`}
            onClick={() => handleSelect(cat.name)}
          >
            <span className="sidebar-icon">{cat.icon}</span>
            <span>{cat.name}</span>
          </button>
        ))}
      </div>
    </aside>
  );
};

export default Sidebar;
