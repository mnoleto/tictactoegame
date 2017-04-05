import React from 'react';
import { Link } from 'react-router';
import '../styles/Header.scss';

const Header = () => {
  return (
    <header className="app-header">
      <Link to="/" className="app-title">Tic Tac Toe</Link>
    </header>
  );
}

export default Header;