import React, {
  useState,
  useEffect
} from 'react';

import {
  Link,
  useLocation,
  useNavigate
} from 'react-router-dom';

import {
  useAuth
} from '../context/AuthContext';

import logo from '../assets/logo.png';

function Navbar() {

  const {
    pathname
  } = useLocation();

  const navigate =
    useNavigate();

  const {
    logout,
    isAdmin
  } = useAuth();

  const [mobileOpen,
    setMobileOpen] =
    useState(false);

  const [scrolled,
    setScrolled] =
    useState(false);

  const [isMobile,
    setIsMobile] =
    useState(
      window.innerWidth <= 900
    );

  // ===============================
  // 🚀 SCROLL EFFECT
  // ===============================
  useEffect(() => {

    const handleScroll =
      () => {

        setScrolled(
          window.scrollY > 30
        );
      };

    const handleResize =
      () => {

        setIsMobile(
          window.innerWidth <= 900
        );
      };

    window.addEventListener(
      'scroll',
      handleScroll
    );

    window.addEventListener(
      'resize',
      handleResize
    );

    return () => {

      window.removeEventListener(
        'scroll',
        handleScroll
      );

      window.removeEventListener(
        'resize',
        handleResize
      );
    };

  }, []);

  // ===============================
  // 🚪 LOGOUT
  // ===============================
  const handleLogout = () => {

    logout();

    navigate('/');
  };

  // ===============================
  // 📚 LINKS
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
      <nav style={{

        ...navWrapper,

        top:
          scrolled
            ? 10
            : 20
      }}>

        <div style={{

          ...navStyle,

          width:
            scrolled
              ? '88%'
              : '92%',

          height:
            scrolled
              ? 64
              : 74
        }}>

          {/* ===============================
              🌌 TOP GLOW
          =============================== */}
          <div style={topGlow} />

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

              style={{

                ...logoImage,

                width:
                  scrolled
                    ? 82
                    : 94
              }}
            />

          </Link>

          {/* ===============================
              💻 DESKTOP LINKS
          =============================== */}
          {!isMobile && (

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

                      {pathname ===
                        path && (

                          <span
                            style={
                              activeDot
                            }
                          />
                        )}

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
          )}

          {/* ===============================
              📱 MOBILE BUTTON
          =============================== */}
          {isMobile && (

            <button

              onClick={() =>
                setMobileOpen(
                  !mobileOpen
                )
              }

              style={menuBtn}
            >

              {mobileOpen
                ? '✕'
                : '☰'}

            </button>
          )}
        </div>

        {/* ===============================
            📱 MOBILE MENU
        =============================== */}
        {isMobile && (

          <div style={{

            ...mobileMenu,

            opacity:
              mobileOpen
                ? 1
                : 0,

            transform:
              mobileOpen

                ? 'translateY(0px)'

                : 'translateY(-20px)',

            pointerEvents:
              mobileOpen
                ? 'all'
                : 'none'
          }}>

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

            {isAdmin && (

              <>
                <Link
                  to="/admin"

                  style={mobileLink}
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

  left: 0,

  width: '100%',

  display: 'flex',

  flexDirection:
    'column',

  alignItems:
    'center',

  zIndex: 999,

  transition:
    '0.35s ease'
};

const navStyle = {

  position: 'relative',

  maxWidth: 1320,

  display: 'flex',

  alignItems: 'center',

  justifyContent:
    'space-between',

  padding: '0 28px',

  borderRadius: 30,

  overflow: 'hidden',

  backdropFilter:
    'blur(22px)',

  WebkitBackdropFilter:
    'blur(22px)',

  background:
    'rgba(2,8,20,0.62)',

  border:
    '1px solid rgba(0,170,255,0.12)',

  boxShadow:
    '0 8px 40px rgba(0,0,0,0.28)',

  transition:
    '0.35s ease'
};

const topGlow = {

  position: 'absolute',

  top: 0,

  left: '-20%',

  width: '140%',

  height: 1,

  background:
    'linear-gradient(90deg,transparent,#00d4ff,transparent)',

  opacity: 0.6
};

const logoWrap = {

  display: 'flex',

  alignItems: 'center',

  textDecoration: 'none',

  zIndex: 2
};

const logoImage = {

  objectFit: 'contain',

  transition:
    '0.35s ease',

  filter:
    'drop-shadow(0 0 18px rgba(0,170,255,0.35))'
};

const desktopLinks = {

  display: 'flex',

  alignItems: 'center',

  gap: 34,

  listStyle: 'none',

  margin: 0,

  padding: 0
};

const linkStyle = {

  position: 'relative',

  display: 'flex',

  alignItems: 'center',

  gap: 8,

  textDecoration: 'none',

  fontFamily:
    'Orbitron,sans-serif',

  fontSize: 12,

  fontWeight: 600,

  letterSpacing: 3,

  textTransform:
    'uppercase',

  transition:
    '0.25s ease'
};

const activeDot = {

  width: 7,

  height: 7,

  borderRadius: '50%',

  background: '#00d4ff',

  boxShadow:
    '0 0 12px #00d4ff'
};

const logoutBtn = {

  border:
    '1px solid rgba(0,212,255,0.22)',

  background:
    'rgba(0,212,255,0.08)',

  color: '#00d4ff',

  padding:
    '10px 18px',

  borderRadius: 14,

  cursor: 'pointer',

  fontFamily:
    'Orbitron,sans-serif',

  fontSize: 11,

  letterSpacing: 2,

  transition:
    '0.3s ease'
};

const menuBtn = {

  border: 'none',

  background:
    'transparent',

  color: '#00d4ff',

  fontSize: 28,

  cursor: 'pointer'
};

const mobileMenu = {

  width: '92%',

  marginTop: 12,

  padding:
    '24px 22px',

  borderRadius: 24,

  background:
    'rgba(2,8,20,0.92)',

  border:
    '1px solid rgba(0,170,255,0.12)',

  backdropFilter:
    'blur(24px)',

  display: 'flex',

  flexDirection:
    'column',

  gap: 22,

  transition:
    '0.35s ease'
};

const mobileLink = {

  textDecoration: 'none',

  fontFamily:
    'Orbitron,sans-serif',

  fontSize: 14,

  letterSpacing: 2,

  textTransform:
    'uppercase'
};

const mobileLogoutBtn = {

  border:
    '1px solid rgba(0,170,255,0.22)',

  background:
    'rgba(0,212,255,0.08)',

  color: '#00d4ff',

  padding:
    '14px 18px',

  borderRadius: 14,

  cursor: 'pointer',

  fontFamily:
    'Orbitron,sans-serif',

  fontSize: 12,

  letterSpacing: 2
};

export default Navbar;