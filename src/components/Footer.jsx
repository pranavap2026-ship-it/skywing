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
  FaArrowUp
} from 'react-icons/fa';

// ===============================
// 🖼️ LOGOS
// ===============================
import skywingLogo
  from '../assets/logo.png';

import collegeLogo
  from '../assets/college-logo.png';

export default function Footer() {

  const [showTop,
    setShowTop] =
    useState(false);

  // ===============================
  // 🚀 SCROLL TOP VISIBILITY
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

    <>
      {/* ===============================
          🌌 FOOTER
      =============================== */}
      <footer style={footerStyle}>

        {/* GLOW */}
        <div style={topGlow} />

        {/* ===============================
            🔷 BRAND
        =============================== */}
        <div style={brandSection}>

          {/* LOGOS */}
          <div style={logoContainer}>

            {/* COLLEGE */}
            <img
              src={collegeLogo}
              alt="College Logo"

              style={
                collegeLogoStyle
              }
            />

            {/* DIVIDER */}
            <div style={divider} />

            {/* SKYWING */}
            <img
              src={skywingLogo}
              alt="SkyWing Logo"

              style={footerLogo}
            />

          </div>

          {/* TAGLINE */}
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

          {/* ===============================
              🧭 NAVIGATION
          =============================== */}
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

          {/* ===============================
              🌐 SOCIAL
          =============================== */}
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
                href="https://www.instagram.com/skywing.cep?igsh=MTF0bmJnYnpnbXVjdg=="

                target="_blank"
                rel="noreferrer"

                style={socialBtn}
              >
                <FaInstagram />
              </a>

              <a
                href="https://youtube.com/@cepoonjar?si=VNp_VJICoWhvSe0L"

                target="_blank"
                rel="noreferrer"

                style={socialBtn}
              >
                <FaYoutube />
              </a>

            </div>
          </div>

          {/* ===============================
              📡 UPDATES
          =============================== */}
          <div>

            <h3 style={heading}>
              Live Updates
            </h3>

            <div style={updatesWrap}>

              <div style={updateCard}>
                📸 New event gallery uploaded
              </div>

              <div style={updateCard}>
                🎬 Video highlights released
              </div>

              <div style={updateCard}>
                🎉 Arts Fest media live
              </div>

            </div>
          </div>

          {/* ===============================
              💎 ABOUT
          =============================== */}
          <div>

            <h3 style={heading}>
              About
            </h3>

            <p style={aboutText}>

              SkyWing Media Team is a
              futuristic creative media
              collective focused on
              photography, videography,
              branding and storytelling.

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
              CEP Media Team
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
    </>
  );
}

// ===============================
// 🎨 STYLES
// ===============================

const footerStyle = {

  position: 'relative',

  width: '100%',

  marginTop: 140,

  padding:
    '100px 8% 50px',

  background:
    'linear-gradient(to bottom, rgba(2,8,20,0.96), #020617)',

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

  height: 240,

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

  gap: 28,

  flexWrap: 'wrap',

  marginBottom: 24
};

const collegeLogoStyle = {

  width: 110,

  height: 110,

  objectFit: 'contain',

  filter:
    'drop-shadow(0 0 25px rgba(255,255,255,0.18))'
};

const divider = {

  width: 1,

  height: 90,

  background:
    'rgba(255,255,255,0.15)'
};

const footerLogo = {

  width: 220,

  maxWidth: '85%',

  objectFit: 'contain',

  filter:
    'drop-shadow(0 0 30px rgba(0,170,255,0.35))'
};

const tagline = {

  color:
    'rgba(255,255,255,0.7)',

  fontSize: 15,

  letterSpacing: 1.5,

  lineHeight: 1.8
};

const footerGrid = {

  display: 'grid',

  gridTemplateColumns:
    'repeat(auto-fit,minmax(240px,1fr))',

  gap: 45,

  marginBottom: 80
};

const heading = {

  color: '#00d4ff',

  fontSize: 14,

  fontFamily:
    'Orbitron,sans-serif',

  textTransform:
    'uppercase',

  letterSpacing: 3,

  marginBottom: 28
};

const linksWrap = {

  display: 'flex',

  flexDirection:
    'column',

  gap: 18
};

const footerLink = {

  color:
    'rgba(255,255,255,0.75)',

  textDecoration: 'none',

  fontSize: 15
};

const socialWrap = {

  display: 'flex',

  gap: 18,

  flexWrap: 'wrap'
};

const socialBtn = {

  width: 56,

  height: 56,

  borderRadius: '50%',

  display: 'flex',

  alignItems: 'center',

  justifyContent:
    'center',

  fontSize: 20,

  color: '#00d4ff',

  background:
    'rgba(255,255,255,0.04)',

  border:
    '1px solid rgba(0,170,255,0.18)',

  backdropFilter:
    'blur(12px)',

  textDecoration: 'none'
};

const updatesWrap = {

  display: 'flex',

  flexDirection:
    'column',

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
    '1px solid rgba(255,255,255,0.05)',

  backdropFilter:
    'blur(12px)',

  fontSize: 14
};

const aboutText = {

  color:
    'rgba(255,255,255,0.72)',

  lineHeight: 1.9,

  fontSize: 15
};

const bottomBar = {

  paddingTop: 30,

  borderTop:
    '1px solid rgba(255,255,255,0.08)',

  display: 'flex',

  justifyContent:
    'space-between',

  alignItems: 'center',

  flexWrap: 'wrap',

  gap: 20
};

const copyText = {

  color:
    'rgba(255,255,255,0.5)',

  fontSize: 14
};

const bottomLinks = {

  display: 'flex',

  gap: 24,

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

  right: 24,

  bottom: 24,

  width: 58,

  height: 58,

  borderRadius: '50%',

  border: 'none',

  background:
    'linear-gradient(135deg,#00d4ff,#0066ff)',

  color: '#fff',

  fontSize: 20,

  cursor: 'pointer',

  boxShadow:
    '0 0 30px rgba(0,170,255,0.4)',

  zIndex: 999
};