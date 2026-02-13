import React from 'react';
import { GiHamburgerMenu } from 'react-icons/gi';

const MenuIcon = ({ onClick }) => {
  return (
    <button type="button" className="menu-btn" onClick={onClick} aria-label="Toggle menu">
      <GiHamburgerMenu size={20} />
    </button>
  );
};

export default MenuIcon;
