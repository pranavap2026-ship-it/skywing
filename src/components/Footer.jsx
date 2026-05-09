import React, {
  useEffect,
  useState
} from 'react';

import {
  Link
} from 'react-router-dom';

import {
FaTelegramPlane,
FaInstagram,
FaYoutube,
FaFacebookF,
FaArrowUp
} from 'react-icons/fa';

import skywingLogo
  from '../assets/logo.png';

import collegeLogo
  from '../assets/college-logo.png';

export default function Footer() {

  const [showTop,
    setShowTop] =
    useState(false);

  const isMobile =
    window.innerWidth <= 768;

  // ===============================
  // 🚀 SCROLL DETECT
  // ===============================
  useEffect(() => {

    const handleScroll =
      () => {

        setShowTop(
          window.scrollY > 400
        );
      };

    window.addEventListener(
      'scroll',
      handleScroll
    );

    return () =>
      window.removeEventListener(
        'scroll',
        handleScroll
      );

  }, []);

  // ===============================
  // ⬆️ SCROLL TOP
  // ===============================
  const scrollTop = () => {

    window.scrollTo({

      top: 0,

      behavior: 'smooth'
    });
  };

  return (

    <footer style={footerStyle}>

      {/* GLOW */}
      <div style={topGlow} />

      {/* ===============================
          🔷 BRAND
      =============================== */}
      <div style={brandSection}>

        <div style={logoContainer}>

          <img
            src={collegeLogo}
            alt="College Logo"
            style={collegeLogoStyle}
          />

          <div style={divider} />

          <img
            src={skywingLogo}
            alt="SkyWing Logo"
            style={footerLogo}
          />

        </div>

        <p style={tagline}>

          Capturing moments.
          Creating stories.
          Preserving memories.

        </p>
      </div>

      {/* ===============================
          🚀 GRID
      =============================== */}
      <div style={footerGrid}>

        {/* NAVIGATION */}
        <div>

          <h3 style={heading}>
            Navigation
          </h3>

          <div style={linksWrap}>

            <Link
              to="/"
              style={footerLink}
            >
              Home
            </Link>

            <Link
              to="/events"
              style={footerLink}
            >
              Events
            </Link>

            <Link
              to="/team"
              style={footerLink}
            >
              Team
            </Link>

            <Link
              to="/social"
              style={footerLink}
            >
              Connect
            </Link>

          </div>
        </div>

        {/* SOCIAL */}
        <div>

          <h3 style={heading}>
            Connect
          </h3>

          <div style={socialWrap}>

  <a
    href="https://t.me/skywingstudentscorner"
    target="_blank"
    rel="noreferrer"
    style={socialBtn}
  >
    <FaTelegramPlane />
  </a>

  <a
    href="https://www.instagram.com/skywing.cep"
    target="_blank"
    rel="noreferrer"
    style={socialBtn}
  >
    <FaInstagram />
  </a>

  <a
    href="https://www.facebook.com/share/18kENJGkTZ/"
    target="_blank"
    rel="noreferrer"
    style={socialBtn}
  >
    <FaFacebookF />
  </a>

  <a
    href="https://youtube.com/@cepoonjar"
    target="_blank"
    rel="noreferrer"
    style={socialBtn}
  >
    <FaYoutube />
  </a>

</div>
        </div>


        {/* ABOUT */}
        <div>

          <h3 style={heading}>
            About
          </h3>

          <p style={aboutText}>

            SkyWing Media Team is the
            official creative media
            collective of CEP focused
            on photography,
            videography, editing and
            digital storytelling.

          </p>

        </div>
      </div>

      {/* ===============================
          ⚡ BOTTOM BAR
      =============================== */}
      <div style={bottomBar}>

        <p style={copyText}>

          © {new Date().getFullYear()}
          {' '}
          SkyWing Media Team.
          All Rights Reserved.

        </p>

        <div style={bottomLinks}>

          <span style={miniLink}>
            Privacy
          </span>

          <span style={miniLink}>
            Terms
          </span>

          <span style={miniLink}>
            CEP
          </span>

        </div>
      </div>

      {/* ===============================
          ⬆️ SCROLL TOP
      =============================== */}
      {showTop && (

        <button
          onClick={scrollTop}
          style={scrollTopBtn}
        >

          <FaArrowUp />

        </button>
      )}
    </footer>
  );
}

// ===============================
// 🎨 STYLES
// ===============================

const footerStyle = {

  position: 'relative',

  width: '100%',

  marginTop: 100,

  padding:
    window.innerWidth <= 768

      ? '70px 20px 40px'

      : '100px 8% 50px',

  background:
    'linear-gradient(to bottom, rgba(2,8,20,0.98), #020617)',

  overflow: 'hidden',

  borderTop:
    '1px solid rgba(0,170,255,0.12)'
};

const topGlow = {

  position: 'absolute',

  top: -120,

  left: '50%',

  transform:
    'translateX(-50%)',

  width: 500,

  height: 250,

  background:
    'rgba(0,170,255,0.12)',

  filter:
    'blur(120px)',

  borderRadius: '50%'
};

const brandSection = {

  marginBottom: 70,

  textAlign: 'center'
};

const logoContainer = {

  display: 'flex',

  alignItems: 'center',

  justifyContent: 'center',

  gap:
    window.innerWidth <= 768
      ? 14
      : 28,

  flexWrap: 'wrap',

  marginBottom: 20
};

const collegeLogoStyle = {

  width:
    window.innerWidth <= 768
      ? 70
      : 110,

  height:
    window.innerWidth <= 768
      ? 70
      : 110,

  objectFit: 'contain'
};

const divider = {

  width: 1,

  height:
    window.innerWidth <= 768
      ? 55
      : 90,

  background:
    'rgba(255,255,255,0.15)'
};

const footerLogo = {

  width:
    window.innerWidth <= 768
      ? 150
      : 220,

  maxWidth: '85%',

  objectFit: 'contain',

  filter:
    'drop-shadow(0 0 30px rgba(0,170,255,0.35))'
};

const tagline = {

  color:
    'rgba(255,255,255,0.7)',

  fontSize:
    window.innerWidth <= 768
      ? 13
      : 15,

  lineHeight: 1.8
};

const footerGrid = {

  display: 'grid',

  gridTemplateColumns:
    window.innerWidth <= 768

      ? '1fr'

      : 'repeat(auto-fit,minmax(240px,1fr))',

  gap:
    window.innerWidth <= 768
      ? 40
      : 45,

  marginBottom: 60
};

const heading = {

  color: '#00d4ff',

  fontSize: 14,

  fontFamily:
    'Orbitron,sans-serif',

  letterSpacing: 3,

  marginBottom: 22,

  textAlign:
    window.innerWidth <= 768
      ? 'center'
      : 'left'
};

const linksWrap = {

  display: 'flex',

  flexDirection: 'column',

  alignItems:
    window.innerWidth <= 768
      ? 'center'
      : 'flex-start',

  gap: 16
};

const footerLink = {

  color:
    'rgba(255,255,255,0.75)',

  textDecoration: 'none',

  fontSize: 15,

  transition:
    '0.3s ease'
};

const socialWrap = {

  display: 'flex',

  justifyContent:
    window.innerWidth <= 768
      ? 'center'
      : 'flex-start',

  gap: 18,

  flexWrap: 'wrap'
};

const socialBtn = {

  width: 54,

  height: 54,

  borderRadius: '50%',

  display: 'flex',

  alignItems: 'center',

  justifyContent: 'center',

  color: '#00d4ff',

  fontSize: 20,

  textDecoration: 'none',

  background:
    'rgba(255,255,255,0.04)',

  border:
    '1px solid rgba(255,255,255,0.08)',

  backdropFilter:
    'blur(12px)'
};

const updatesWrap = {

  display: 'flex',

  flexDirection: 'column',

  gap: 16
};

const updateCard = {

  padding:
    '16px 18px',

  borderRadius: 18,

  color:
    'rgba(255,255,255,0.82)',

  background:
    'rgba(255,255,255,0.03)',

  border:
    '1px solid rgba(255,255,255,0.05)'
};

const aboutText = {

  color:
    'rgba(255,255,255,0.72)',

  lineHeight: 1.9,

  fontSize: 15,

  textAlign:
    window.innerWidth <= 768
      ? 'center'
      : 'left'
};

const bottomBar = {

  paddingTop: 30,

  borderTop:
    '1px solid rgba(255,255,255,0.08)',

  display: 'flex',

  flexDirection:
    window.innerWidth <= 768
      ? 'column'
      : 'row',

  justifyContent:
    'space-between',

  alignItems: 'center',

  gap: 18,

  textAlign: 'center'
};

const copyText = {

  color:
    'rgba(255,255,255,0.5)',

  fontSize: 14
};

const bottomLinks = {

  display: 'flex',

  justifyContent: 'center',

  gap:
    window.innerWidth <= 768
      ? 14
      : 24,

  flexWrap: 'wrap'
};

const miniLink = {

  color:
    'rgba(255,255,255,0.55)',

  fontSize: 13,

  cursor: 'pointer'
};

const scrollTopBtn = {

  position: 'fixed',

  right:
    window.innerWidth <= 768
      ? 16
      : 24,

  bottom:
    window.innerWidth <= 768
      ? 16
      : 24,

  width:
    window.innerWidth <= 768
      ? 48
      : 58,

  height:
    window.innerWidth <= 768
      ? 48
      : 58,

  borderRadius: '50%',

  border: 'none',

  background:
    'linear-gradient(135deg,#00d4ff,#0066ff)',

  color: '#fff',

  fontSize:
    window.innerWidth <= 768
      ? 16
      : 20,

  cursor: 'pointer',

  boxShadow:
    '0 0 30px rgba(0,170,255,0.4)',

  zIndex: 999
};