import React from 'react';
import './Sidebar.css';
import { Link } from 'react-router-dom';

import { AiFillHome } from 'react-icons/ai';
import { FaCar, FaGamepad, FaMusic, FaBlog, FaThumbsUp, FaHistory } from 'react-icons/fa';
import { MdOutlineMovie, MdSportsCricket } from 'react-icons/md';
import { FiMonitor } from 'react-icons/fi';
import { BsNewspaper } from 'react-icons/bs';

const categories = [
  { name: 'Home', icon: <AiFillHome />, path: '/' },
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

const Sidebar = ({ selectedCategory, onSelectCategory }) => {
  return (
    <div className="sidebar">
      {categories.map((cat) => (
        <div
          key={cat.name}
          className={`sidebar-item ${selectedCategory === cat.name ? 'active' : ''}`}
          onClick={() => onSelectCategory(cat.name)}
        >
          {cat.path ? (
            <Link to={cat.path} className="sidebar-link">
              {cat.icon}
              <span>{cat.name}</span>
            </Link>
          ) : (
            <>
              {cat.icon}
              <span>{cat.name}</span>
            </>
          )}
        </div>
      ))}
    </div>
  );
};

export default Sidebar;
