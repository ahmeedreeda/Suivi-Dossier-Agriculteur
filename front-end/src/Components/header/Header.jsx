import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './header.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleInfo, faHouse, faPhone, faUser } from '@fortawesome/free-solid-svg-icons';

function Header() {
  const navigate = useNavigate();

  return (
    <div className="main-header">
      {/* Top header: Logo */}
      <header>
        <button
          onClick={() => navigate('/')}
          style={{ background: 'none', border: 'none', cursor: 'pointer' }}
        >
          <img
            src={`${process.env.PUBLIC_URL}/images/logo-clients-avs-440x21013.png`}
            alt="logo"
          />
        </button>
      </header>

      {/* Bottom header: Navigation */}
      <div className="bottom-header">
        <Link to={'/'}>
          <FontAwesomeIcon icon={faHouse} /> Home
        </Link>
        <a href='#contact'>
          <FontAwesomeIcon icon={faPhone} /> Contact
        </a>
        <a href='#contact'>
          <FontAwesomeIcon icon={faCircleInfo} /> About
        </a>
        <Link to={'/logIn'}>
          <FontAwesomeIcon icon={faUser} /> Register / Login
        </Link>
      </div>
    </div>
  );
}

export default Header;