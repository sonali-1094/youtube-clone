import React from 'react';
import './Navbar.css';
import { FaSearch, FaYoutube } from 'react-icons/fa';
import { IoMdNotificationsOutline } from 'react-icons/io';
import { CgProfile } from 'react-icons/cg';
import { MdMoreVert } from 'react-icons/md';
import { FiUpload } from 'react-icons/fi';
import MenuIcon from './MenuIcon';

const Navbar = () => {
  return (
    <nav className="navbar">
      {/* Left: Logo + Menu */}
      <div className="nav-left">
        <MenuIcon />
        <FaYoutube className="icon youtube-icon" />
        <div className="logo-text">YouTube</div>
      </div>

      {/* Middle: Search */}
      <div className="nav-middle">
        <input type="text" placeholder="Search..." />
        <FaSearch className="icon search-icon" />
      </div>

      {/* Right: Icons */}
      <div className="nav-right">
        <FiUpload className="icon" />
        <IoMdNotificationsOutline className="icon" />
        <CgProfile className="icon profile-icon" />
        <MdMoreVert className="icon" />
      </div>
    </nav>
  );
};

export default Navbar;
