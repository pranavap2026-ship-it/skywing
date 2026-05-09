import React from 'react';

import {
  Link,
  useLocation,
  useNavigate
} from 'react-router-dom';

import {
  useAuth
} from '../context/AuthContext';

// ✅ Logo Image
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
  // 📚 NAV LINKS
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
          🚀 LEFT LOGO
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

        <h1 style={logoText}>
          SKY<span
            style={{
              color:
                '#00aaff'
            }}
          >
            ING
          </span>
        </h1>
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
                    pathname ===
                    path

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
            ⚡ ADMIN DASHBOARD
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

  height: 72,

  display: 'flex',

  alignItems: 'center',

  justifyContent:
    'space-between',

  padding: '0 32px',

  zIndex: 999,

  backdropFilter:
    'blur(14px)',

  background:
    'rgba(2,8,20,0.72)',

  borderBottom:
    '1px solid rgba(0,170,255,0.15)'
};

const logoWrap = {

  display: 'flex',

  alignItems: 'center',

  gap: 12,

  textDecoration: 'none'
};

const logoImage = {

  width: 42,

  height: 42,

  objectFit: 'cover',

  borderRadius: '50%',

  boxShadow:
    '0 0 20px rgba(0,170,255,0.45)'
};

const logoText = {

  fontFamily:
    'Orbitron,sans-serif',

  fontSize: 28,

  fontWeight: 900,

  letterSpacing: 4,

  color: '#fff',

  margin: 0
};

const navLinks = {

  display: 'flex',

  alignItems: 'center',

  gap: 28,

  listStyle: 'none',

  margin: 0,

  padding: 0
};

const linkStyle = {

  textDecoration: 'none',

  fontFamily:
    'Orbitron,sans-serif',

  fontSize: 12,

  letterSpacing: 3,

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