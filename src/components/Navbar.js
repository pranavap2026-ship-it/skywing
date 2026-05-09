import React, { useState } from 'react';

import {
  Link,
  useLocation,
  useNavigate
} from 'react-router-dom';

import {
  Menu,
  X
} from 'lucide-react';

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
    logout,
    isAdmin
  } = useAuth();

  const [mobileOpen,
    setMobileOpen] =
    useState(false);

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

    <>
      {/* ===============================
          🚀 NAVBAR
      =============================== */}
      <nav style={navWrapper}>

        <div style={navStyle}>

          {/* ===============================
              🔷 LOGO
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
              💻 DESKTOP LINKS
          =============================== */}
          <ul style={desktopLinks}>

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

            {/* 👑 ADMIN */}
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

          {/* ===============================
              📱 MOBILE MENU BUTTON
          =============================== */}
          <button
            style={menuBtn}
            onClick={() =>
              setMobileOpen(
                !mobileOpen
              )
            }
          >
            {mobileOpen
              ? <X size={24} />
              : <Menu size={24} />
            }
          </button>
        </div>

        {/* ===============================
            📱 MOBILE MENU
        =============================== */}
        {mobileOpen && (

          <div style={mobileMenu}>

            {links.map(
              ([path, label]) => (

                <Link
                  key={path}
                  to={path}

                  onClick={() =>
                    setMobileOpen(
                      false
                    )
                  }

                  style={{

                    ...mobileLink,

                    color:
                      pathname === path

                        ? '#00d4ff'

                        : '#dbeafe'
                  }}
                >
                  {label}
                </Link>
              )
            )}

            {/* 👑 ADMIN */}
            {isAdmin && (

              <>
                <Link
                  to="/admin"

                  onClick={() =>
                    setMobileOpen(
                      false
                    )
                  }

                  style={{

                    ...mobileLink,

                    color:
                      pathname ===
                      '/admin'

                        ? '#00d4ff'

                        : '#dbeafe'
                  }}
                >
                  Dashboard
                </Link>

                <button
                  onClick={
                    handleLogout
                  }

                  style={
                    mobileLogoutBtn
                  }
                >
                  Logout
                </button>
              </>
            )}
          </div>
        )}
      </nav>
    </>
  );
}

// ===============================
// 🎨 STYLES
// ===============================

const navWrapper = {

  position: 'fixed',

  top: 18,

  left: 0,

  width: '100%',

  display: 'flex',

  justifyContent:
    'center',

  zIndex: 999
};

const navStyle = {

  width: '92%',

  maxWidth: 1250,

  height: 68,

  display: 'flex',

  alignItems: 'center',

  justifyContent:
    'space-between',

  padding: '0 24px',

  borderRadius: 22,

  backdropFilter:
    'blur(18px)',

  background:
    'rgba(5,10,25,0.72)',

  border:
    '1px solid rgba(0,170,255,0.15)',

  boxShadow:
    '0 8px 32px rgba(0,0,0,0.25)'
};

const logoWrap = {

  display: 'flex',

  alignItems: 'center',

  textDecoration: 'none'
};

const logoImage = {

  width: 95,

  height: 'auto',

  objectFit: 'contain',

  filter:
    'drop-shadow(0 0 16px rgba(0,170,255,0.25))'
};

const desktopLinks = {

  display: 'flex',

  alignItems: 'center',

  gap: 30,

  listStyle: 'none',

  margin: 0,

  padding: 0
};

const linkStyle = {

  textDecoration: 'none',

  fontFamily:
    'Orbitron,sans-serif',

  fontSize: 12,

  fontWeight: 500,

  letterSpacing: 3,

  textTransform:
    'uppercase',

  transition:
    '0.25s ease'
};

const logoutBtn = {

  border:
    '1px solid rgba(0,170,255,0.35)',

  background:
    'transparent',

  color: '#00d4ff',

  padding:
    '10px 16px',

  borderRadius: 12,

  cursor: 'pointer',

  fontFamily:
    'Orbitron,sans-serif',

  fontSize: 11,

  letterSpacing: 2,

  transition:
    '0.25s'
};

const menuBtn = {

  display: 'none',

  alignItems: 'center',

  justifyContent:
    'center',

  border: 'none',

  background:
    'transparent',

  color: '#00d4ff',

  cursor: 'pointer'
};

const mobileMenu = {

  width: '92%',

  marginTop: 10,

  padding:
    '20px 18px',

  borderRadius: 22,

  backdropFilter:
    'blur(18px)',

  background:
    'rgba(5,10,25,0.95)',

  border:
    '1px solid rgba(0,170,255,0.15)',

  display: 'flex',

  flexDirection:
    'column',

  gap: 18
};

const mobileLink = {

  textDecoration: 'none',

  fontFamily:
    'Orbitron,sans-serif',

  fontSize: 13,

  letterSpacing: 2,

  textTransform:
    'uppercase'
};

const mobileLogoutBtn = {

  border:
    '1px solid rgba(0,170,255,0.35)',

  background:
    'transparent',

  color: '#00d4ff',

  padding:
    '12px 16px',

  borderRadius: 12,

  cursor: 'pointer',

  fontFamily:
    'Orbitron,sans-serif',

  fontSize: 12,

  letterSpacing: 2
};

// ===============================
// 📱 RESPONSIVE
// ===============================
if (window.innerWidth <= 768) {

  desktopLinks.display =
    'none';

  menuBtn.display =
    'flex';

  navStyle.height =
    62;

  navStyle.padding =
    '0 18px';

  logoImage.width =
    82;
}