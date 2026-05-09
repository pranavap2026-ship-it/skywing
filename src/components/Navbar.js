import React from 'react';

import {
  Link,
  useLocation,
  useNavigate
} from 'react-router-dom';

import {
  useAuth
} from '../context/AuthContext';

// ✅ LOGO
import logo from '../assets/logo.png';

export default function Navbar() {

  const { pathname } =
    useLocation();

  const navigate =
    useNavigate();

  const {
    user,
    logout,
    isAdmin
  } = useAuth();

  // ===============================
  // 🚪 LOGOUT
  // ===============================
  const handleLogout = () => {

    logout();

    navigate('/');
  };

  // ===============================
  // 📚 NAVIGATION LINKS
  // ===============================
  const links = [

    ['/', 'Home'],

    ['/events', 'Events'],

    ['/team', 'Team'],

    ['/social', 'Connect']
  ];

  return (

    <nav style={navStyle}>

      {/* ===============================
          🚀 LEFT LOGO ONLY
      =============================== */}
      <Link
        to="/"
        style={logoWrap}
      >

        <img
          src={logo}
          alt="SkyWing"
          style={logoImage}
        />

      </Link>

      {/* ===============================
          🔗 NAVIGATION
      =============================== */}
      <ul style={navLinks}>

        {links.map(
          ([path, label]) => (

            <li key={path}>

              <Link
                to={path}

                style={{

                  ...linkStyle,

                  color:
                    pathname === path

                      ? '#00d4ff'

                      : '#dbeafe'
                }}
              >
                {label}
              </Link>

            </li>
          )
        )}

        {/* ===============================
            👑 ADMIN ONLY
        =============================== */}
        {isAdmin && (

          <>
            <li>

              <Link
                to="/admin"

                style={{

                  ...linkStyle,

                  color:
                    pathname ===
                    '/admin'

                      ? '#00d4ff'

                      : '#dbeafe'
                }}
              >
                Dashboard
              </Link>

            </li>

            <li>

              <button
                onClick={
                  handleLogout
                }

                style={
                  logoutBtn
                }
              >
                Logout
              </button>

            </li>
          </>
        )}
      </ul>
    </nav>
  );
}

// ===============================
// 🎨 STYLES
// ===============================

const navStyle = {

  position: 'fixed',

  top: 0,

  left: 0,

  width: '100%',

  height: 74,

  display: 'flex',

  alignItems: 'center',

  justifyContent:
    'space-between',

  padding: '0 34px',

  zIndex: 999,

  backdropFilter:
    'blur(16px)',

  background:
    'rgba(2,8,20,0.72)',

  borderBottom:
    '1px solid rgba(0,170,255,0.15)'
};

const logoWrap = {

  display: 'flex',

  alignItems: 'center',

  justifyContent: 'center',

  textDecoration: 'none'
};

const logoImage = {

  width: 115,

  height: 'auto',

  objectFit: 'contain',

  borderRadius: 0,

  boxShadow: 'none',

  background: 'transparent',

  transition:
    '0.3s ease',

  filter:
    'drop-shadow(0 0 18px rgba(0,170,255,0.25))'
};

const navLinks = {

  display: 'flex',

  alignItems: 'center',

  gap: 34,

  listStyle: 'none',

  margin: 0,

  padding: 0
};

const linkStyle = {

  textDecoration: 'none',

  fontFamily:
    'Orbitron,sans-serif',

  fontSize: 13,

  letterSpacing: 4,

  textTransform:
    'uppercase',

  transition:
    'all 0.25s ease'
};

const logoutBtn = {

  border:
    '1px solid rgba(0,170,255,0.4)',

  background:
    'transparent',

  color: '#00d4ff',

  padding:
    '10px 18px',

  borderRadius: 10,

  cursor: 'pointer',

  fontFamily:
    'Orbitron,sans-serif',

  fontSize: 11,

  letterSpacing: 2,

  transition:
    '0.25s'
};