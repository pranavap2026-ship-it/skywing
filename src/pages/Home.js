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
  FaArrowDown,
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

        {/* LABEL */}
        <p
          className="section-label fade-up"
          style={{
            marginBottom: 18
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

        {/* CAMERA */}
        <div
          style={{
            marginTop: 30
          }}
        >
          <Camera3D height={320} />
        </div>

        {/* BUTTONS */}
        <div style={btnContainer}>

          <Link
            to="/events"
            className="btn btn-primary glow-btn"
          >
            Explore Events
          </Link>

          <Link
            to="/team"
            className="btn btn-secondary glow-btn"
          >
            Meet Team
          </Link>

          <Link
            to="/social"
            className="btn btn-secondary glow-btn"
          >
            Connect
          </Link>
        </div>

        {/* STATS */}
        <div style={statsContainer}>

          <div className="card fade-up">

            <FaUsers
              size={28}
              color="#00aaff"
            />

            <h2>10+</h2>

            <p>Active Members</p>
          </div>

          <div className="card fade-up">

            <FaPhotoVideo
              size={28}
              color="#00aaff"
            />

            <h2>5K+</h2>

            <p>Photos & Videos</p>
          </div>

          <div className="card fade-up">

            <FaAward
              size={28}
              color="#00aaff"
            />

            <h2>5+</h2>

            <p>Events Covered</p>
          </div>
        </div>

        {/* SCROLL */}
        <div style={scrollIndicator}>

          <FaArrowDown />

          <span>SCROLL</span>

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
          media team of College of Engineering Poonjar.
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
              style={{
                padding: 30,
                textAlign:
                  'center'
              }}
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
  minHeight: '82vh',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  textAlign: 'center',
  padding:
    '120px 20px 100px',
  position: 'relative',
  overflow: 'hidden'
};

const titleStyle = {

  fontSize:
    'clamp(70px,12vw,150px)',

  fontWeight: 900,

  letterSpacing: 10,

  lineHeight: 0.9,

  background:
    'linear-gradient(135deg,#fff,#00aaff)',

  WebkitBackgroundClip:
    'text',

  WebkitTextFillColor:
    'transparent',

  marginBottom: 16
};

const typingStyle = {
  letterSpacing: 8,
  color: 'var(--gray)',
  marginBottom: 24,
  minHeight: 20
};

const descStyle = {
  maxWidth: 650,
  color:
    'rgba(240,248,255,0.7)',
  lineHeight: 1.8,
  fontSize: 16
};

const btnContainer = {
  display: 'flex',
  gap: 16,
  flexWrap: 'wrap',
  justifyContent:
    'center',
  marginTop: 40
};

const statsContainer = {
  display: 'grid',
  gridTemplateColumns:
    'repeat(auto-fit,minmax(220px,1fr))',
  gap: 20,
  width: '100%',
  maxWidth: 900,
  marginTop: 70
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

const scrollIndicator = {
  position: 'absolute',
  bottom: 30,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: 10,
  fontSize: 12,
  letterSpacing: 4,
  opacity: 0.6
};

const bgGlow1 = {
  position: 'absolute',
  width: 400,
  height: 400,
  borderRadius: '50%',
  background:
    'rgba(0,170,255,0.15)',
  filter: 'blur(100px)',
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
  filter: 'blur(100px)',
  bottom: -100,
  right: -100,
  zIndex: -1
};