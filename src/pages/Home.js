import React, {
  useEffect,
  useState
} from 'react';

import {
  Link
} from 'react-router-dom';

import {
  FaCamera,
  FaVideo,
  FaPaintBrush,
  FaInstagram,
  FaUsers,
  FaPhotoVideo,
  FaAward
} from 'react-icons/fa';

import Camera3D from '../components/Camera3D';

export default function Home() {

  const [text, setText] =
    useState('');

  const fullText =
    'CAPTURE · CREATE · CONNECT';

  // ===============================
  // ⌨️ TYPING EFFECT
  // ===============================
  useEffect(() => {

    let i = 0;

    const interval =
      setInterval(() => {

        setText(
          fullText.slice(0, i)
        );

        i++;

        if (
          i > fullText.length
        ) {

          clearInterval(interval);
        }

      }, 80);

    return () =>
      clearInterval(interval);

  }, []);

  return (
    <>
      {/* ================= HERO ================= */}
      <section style={container}>

        {/* HUD */}
        <div className="hud-tl" />
        <div className="hud-tr" />
        <div className="hud-bl" />
        <div className="hud-br" />

        {/* GLOW */}
        <div style={bgGlow1} />
        <div style={bgGlow2} />

        {/* HERO CONTENT */}
        <div style={heroContent}>

          {/* LABEL */}
          <p
            className="section-label fade-up"
            style={{
              marginBottom: 14
            }}
          >
            // COLLEGE MEDIA TEAM — EST. 2024
          </p>

          {/* TITLE */}
          <h1 style={titleStyle}>
            SKYWING
          </h1>

          {/* TYPING */}
          <p style={typingStyle}>
            {text}
          </p>

          {/* DESCRIPTION */}
          <p style={descStyle}>
            We are the eyes and voice
            of CEP — capturing
            unforgettable moments
            through creativity,
            storytelling and innovation.
          </p>

          {/* BUTTONS */}
          <div style={btnContainer}>

            <Link
              to="/events"
              style={primaryBtn}
            >
              Explore Events
            </Link>

            <Link
              to="/team"
              style={secondaryBtn}
            >
              Meet Team
            </Link>

            <Link
              to="/social"
              style={secondaryBtn}
            >
              Connect
            </Link>

          </div>
        </div>

        {/* CAMERA */}
        <div style={cameraWrap}>
          <Camera3D height={240} />
        </div>

        {/* STATS */}
        <div style={statsContainer}>

          <div
            className="card fade-up"
            style={statCard}
          >

            <FaUsers
              size={28}
              color="#00aaff"
            />

            <h2>10+</h2>

            <p>Active Members</p>

          </div>

          <div
            className="card fade-up"
            style={statCard}
          >

            <FaPhotoVideo
              size={28}
              color="#00aaff"
            />

            <h2>5K+</h2>

            <p>Photos & Videos</p>

          </div>

          <div
            className="card fade-up"
            style={statCard}
          >

            <FaAward
              size={28}
              color="#00aaff"
            />

            <h2>5+</h2>

            <p>Events Covered</p>

          </div>
        </div>
      </section>

      {/* ================= ABOUT ================= */}
      <section style={aboutSection}>

        <div className="section-label">
          // WHO WE ARE
        </div>

        <h2 className="section-title">
          ABOUT SKYWING
        </h2>

        <p style={aboutText}>
          Skywing is the official
          media team of College of
          Engineering Poonjar.

          <br /><br />

          We document every moment —
          from cultural fests and
          sports events to technical
          expos and celebrations.

          <br /><br />

          We blend creativity,
          technology and storytelling
          to preserve memories through
          photography, videography,
          design and social media.
        </p>

        {/* FEATURES */}
        <div style={featureGrid}>

          {[
            {
              title:
                'Photography',
              icon:
                <FaCamera />,
              desc:
                'Capturing unforgettable moments with cinematic visuals.'
            },

            {
              title:
                'Videography',
              icon:
                <FaVideo />,
              desc:
                'Professional event coverage and storytelling.'
            },

            {
              title:
                'Editing',
              icon:
                <FaPaintBrush />,
              desc:
                'Creative editing with modern cinematic styles.'
            },

            {
              title:
                'Social Media',
              icon:
                <FaInstagram />,
              desc:
                'Connecting campus stories with the digital world.'
            }

          ].map((item, i) => (

            <div
              key={i}
              className="card fade-up"
              style={featureCard}
            >

              <div
                style={{
                  fontSize: 34,
                  marginBottom: 18,
                  color:
                    '#00aaff'
                }}
              >
                {item.icon}
              </div>

              <h3
                style={{
                  marginBottom: 12,
                  fontFamily:
                    'Orbitron'
                }}
              >
                {item.title}
              </h3>

              <p
                style={{
                  color:
                    'var(--gray)',
                  lineHeight: 1.7,
                  fontSize: 14
                }}
              >
                {item.desc}
              </p>

            </div>
          ))}
        </div>
      </section>
    </>
  );
}

// ===============================
// 🎨 STYLES
// ===============================

const container = {

  minHeight: '100vh',

  display: 'flex',

  flexDirection: 'column',

  alignItems: 'center',

  justifyContent: 'flex-start',

  textAlign: 'center',

  padding:
    window.innerWidth <= 768

      ? '120px 20px 60px'

      : '110px 20px 40px',

  position: 'relative',

  overflow: 'hidden'
};

const heroContent = {

  display: 'flex',

  flexDirection: 'column',

  alignItems: 'center',

  justifyContent: 'center',

  zIndex: 2,

  marginTop:
    window.innerWidth <= 768
      ? 10
      : 30
};

const titleStyle = {

  fontSize:
    window.innerWidth <= 768

      ? '4.5rem'

      : 'clamp(80px,11vw,140px)',

  fontWeight: 900,

  letterSpacing:
    window.innerWidth <= 768
      ? 4
      : 10,

  lineHeight: 0.9,

  background:
    'linear-gradient(135deg,#ffffff,#00aaff)',

  WebkitBackgroundClip:
    'text',

  WebkitTextFillColor:
    'transparent',

  marginBottom: 14
};

const typingStyle = {

  letterSpacing:
    window.innerWidth <= 768
      ? 3
      : 7,

  color: 'var(--gray)',

  marginBottom: 18,

  minHeight: 20,

  fontSize:
    window.innerWidth <= 768
      ? 13
      : 16
};

const descStyle = {

  maxWidth: 650,

  color:
    'rgba(240,248,255,0.72)',

  lineHeight: 1.9,

  fontSize:
    window.innerWidth <= 768
      ? 14
      : 15,

  padding:
    window.innerWidth <= 768
      ? '0 10px'
      : 0
};

const btnContainer = {

  display: 'flex',

  gap:
    window.innerWidth <= 768
      ? 12
      : 16,

  flexWrap: 'wrap',

  justifyContent:
    'center',

  marginTop:
    window.innerWidth <= 768
      ? 45
      : 70,

  position: 'relative',

  zIndex: 5
};

const primaryBtn = {

  padding:
    window.innerWidth <= 768

      ? '15px 24px'

      : '17px 34px',

  borderRadius: 20,

  background:
    'linear-gradient(135deg,#00aaff,#0066ff)',

  color: '#fff',

  textDecoration: 'none',

  fontWeight: 700,

  fontSize:
    window.innerWidth <= 768
      ? 14
      : 16,

  boxShadow:
    '0 0 35px rgba(0,170,255,0.35)',

  transition:
    'all 0.35s ease',

  border:
    '1px solid rgba(255,255,255,0.08)'
};

const secondaryBtn = {

  padding:
    window.innerWidth <= 768

      ? '15px 22px'

      : '17px 30px',

  borderRadius: 20,

  background:
    'rgba(255,255,255,0.05)',

  border:
    '1px solid rgba(255,255,255,0.08)',

  color: '#fff',

  textDecoration: 'none',

  backdropFilter:
    'blur(14px)',

  fontSize:
    window.innerWidth <= 768
      ? 14
      : 16,

  transition:
    'all 0.35s ease'
};

const cameraWrap = {

  marginTop:
    window.innerWidth <= 768
      ? 20
      : 10,

  marginBottom:
    window.innerWidth <= 768
      ? 10
      : 20,

  transform:
    window.innerWidth <= 768

      ? 'scale(0.72)'

      : 'scale(0.9)'
};

const statsContainer = {

  display: 'grid',

  gridTemplateColumns:
    window.innerWidth <= 768

      ? '1fr'

      : 'repeat(auto-fit,minmax(220px,1fr))',

  gap: 20,

  width: '100%',

  maxWidth: 900,

  marginTop:
    window.innerWidth <= 768
      ? 30
      : 45
};

const statCard = {

  padding:
    window.innerWidth <= 768
      ? 24
      : 28,

  textAlign: 'center'
};

const aboutSection = {

  padding:
    '120px 20px',

  textAlign: 'center'
};

const aboutText = {

  maxWidth: 850,

  margin:
    '20px auto 60px',

  color: 'var(--gray)',

  lineHeight: 1.9,

  fontSize: 15
};

const featureGrid = {

  display: 'grid',

  gridTemplateColumns:
    'repeat(auto-fit,minmax(230px,1fr))',

  gap: 25
};

const featureCard = {

  padding: 30,

  textAlign: 'center'
};

const bgGlow1 = {

  position: 'absolute',

  width: 400,

  height: 400,

  borderRadius: '50%',

  background:
    'rgba(0,170,255,0.15)',

  filter:
    'blur(100px)',

  top: -100,

  left: -100,

  zIndex: -1
};

const bgGlow2 = {

  position: 'absolute',

  width: 350,

  height: 350,

  borderRadius: '50%',

  background:
    'rgba(0,120,255,0.12)',

  filter:
    'blur(100px)',

  bottom: -100,

  right: -100,

  zIndex: -1
};