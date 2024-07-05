import React from 'react';
import './NavBar.css';
import { useAuth0 } from "@auth0/auth0-react";
import { Link } from 'react-router-dom';

const NavBar = () => {
  const { user, loginWithRedirect, logout, isAuthenticated } = useAuth0();

  const toggleMenu = () => {
    const navLinks = document.querySelector('.nav-links');
    navLinks.classList.toggle('active');
  };

  return (
    <nav className='nav'>
      <div className='nav-container'>
        <h1 className='nav-logo'>Devika</h1>
        <div className='nav-menu-icon' onClick={toggleMenu}>
          &#9776;
        </div>
        <ul className='nav-links'>
          <li className='nav-item'><Link to="/">Home</Link></li>
          <li className='nav-item'><Link to="/ai-images">AI Images</Link></li>
          <li className='nav-item'><Link to="/about">About</Link></li>
          {isAuthenticated ? (
            <li className='nav-item nav-profile'>
              {user.picture ? (
                <img src={user.picture} alt={user.name} className="nav-profile-pic" />
              ) : (
                <span className="nav-profile-initial">{user.name.charAt(0)}</span>
              )}
              <span className="nav-profile-name">Hello, {user.name.split(' ')[0]}</span>
              <button onClick={() => logout({ returnTo: window.location.origin })}>
                Log Out
              </button>
            </li>
          ) : (
            <li className='nav-item'>
              <button onClick={() => loginWithRedirect()}>Login</button>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
}

export default NavBar;
