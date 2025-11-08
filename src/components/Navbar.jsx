import React from 'react';
import './Navbar.css';
import { FaSearch, FaYoutube } from 'react-icons/fa';
import { IoMdNotificationsOutline } from 'react-icons/io';
import { MdMoreVert } from 'react-icons/md';
import { FiUpload } from 'react-icons/fi';
import MenuIcon from './MenuIcon';

// Clerk imports
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/clerk-react';
import { Link } from 'react-router-dom';

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

      {/* Right: Auth + Icons */}
      <div className="nav-right">
        <FiUpload className="icon" />
        <IoMdNotificationsOutline className="icon" />
        <MdMoreVert className="icon" />

        {/* Clerk Authentication Controls */}
        <SignedOut>
          {/* Show Sign In button if user is logged out */}
          <SignInButton mode="modal">
            <button className="sign-in-btn">Sign In</button>
          </SignInButton>
        </SignedOut>

        <SignedIn>
          {/* Show User Avatar and dropdown when logged in */}
          <UserButton afterSignOutUrl="/sign-in" />
        </SignedIn>
      </div>
    </nav>
  );
};

export default Navbar;
