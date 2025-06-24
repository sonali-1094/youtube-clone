import React from 'react';
import { GiHamburgerMenu } from 'react-icons/gi';

const MenuIcon = ({ toggleMenu }) => {
  return (
    <GiHamburgerMenu
      size={24}
      onClick={toggleMenu}
      style={{ cursor: 'pointer' }}
    />
  );
};

export default MenuIcon;
