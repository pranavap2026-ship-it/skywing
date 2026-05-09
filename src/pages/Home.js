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
  FaAward,
  FaRocket,
  FaPlayCircle,
  FaTelegramPlane,
  FaFacebookF
} from 'react-icons/fa';

import Camera3D
  from '../components/Camera3D';

// ===============================
// 📱 MOBILE SAFE
// ===============================
const isMobile =
  typeof window !== 'undefined' &&
  window.innerWidth <= 768;

// ===============================
// 🚀 COMPONENT
// ===============================
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

          {/* LIVE STATUS */}
          <div style={liveWrap}>

            <div style={liveDot} />

            <span>
              LIVE EVENT COVERAGE ACTIVE
            </span>

          </div>

          {/* BUTTONS */}
          <div style={btnContainer}>

            <Link
              to="/events"
              style={primaryBtn}
            >

              <FaRocket />

              Explore Events

            </Link>

            <Link
              to="/team"
              style={secondaryBtn}
            >

              <FaUsers />

              Meet Team

            </Link>

            <Link
              to="/social"
              style={secondaryBtn}
            >

              <FaInstagram />

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

        {/* FLOATING SOCIAL */}
        <div style={socialFloat}>

          <a
            href="https://www.instagram.com/skywing.cep?igsh=MTF0bmJnYnpnbXVjdg=="
            style={socialBtn}
          >

            <FaInstagram />

          </a>

          <a
            href="https://t.me/skywingstudentscorner"
            style={socialBtn}
          >

            <FaTelegramPlane />

          </a>
           

            <a
            href="https://www.facebook.com/share/18kENJGkTZ/"
            style={socialBtn}
          >

            <FaFacebookF />

          </a>

          <a
            href="https://youtube.com/@cepoonjar?si=VNp_VJICoWhvSe0L"
            style={socialBtn}
          >

            <FaPlayCircle />

          </a>

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
    isMobile

      ? '120px 20px 60px'

      : '110px 20px 40px',

  position: 'relative',

  overflow: 'hidden',

  zIndex: 5
};

const heroContent = {

  display: 'flex',

  flexDirection: 'column',

  alignItems: 'center',

  justifyContent: 'center',

  position: 'relative',

  zIndex: 10,

  marginTop:
    isMobile
      ? 10
      : 30
};

const titleStyle = {

  fontSize:
    isMobile

      ? '4.5rem'

      : 'clamp(80px,11vw,140px)',

  fontWeight: 900,

  letterSpacing:
    isMobile
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
    isMobile
      ? 3
      : 7,

  color: 'var(--gray)',

  marginBottom: 18,

  minHeight: 20,

  fontSize:
    isMobile
      ? 13
      : 16
};

const descStyle = {

  maxWidth: 650,

  color:
    'rgba(240,248,255,0.72)',

  lineHeight: 1.9,

  fontSize:
    isMobile
      ? 14
      : 15,

  padding:
    isMobile
      ? '0 10px'
      : 0
};

const liveWrap = {

  display: 'flex',

  alignItems: 'center',

  gap: 10,

  marginTop: 25,

  padding: '12px 18px',

  borderRadius: 50,

  background:
    'rgba(255,255,255,0.05)',

  border:
    '1px solid rgba(0,170,255,0.18)',

  color: '#fff',

  backdropFilter:
    'blur(14px)',

  fontSize: 13,

  letterSpacing: 2
};

const liveDot = {

  width: 10,

  height: 10,

  borderRadius: '50%',

  background: '#00ff88',

  boxShadow:
    '0 0 12px #00ff88'
};

const btnContainer = {

  display: 'flex',

  gap:
    isMobile
      ? 12
      : 16,

  flexWrap: 'wrap',

  justifyContent:
    'center',

  marginTop:
    isMobile
      ? 45
      : 70
};

const primaryBtn = {

  display: 'flex',

  alignItems: 'center',

  gap: 10,

  padding:
    isMobile

      ? '15px 24px'

      : '17px 34px',

  borderRadius: 20,

  background:
    'linear-gradient(135deg,#00aaff,#0066ff)',

  color: '#fff',

  textDecoration: 'none',

  fontWeight: 700,

  fontSize:
    isMobile
      ? 14
      : 16,

  boxShadow:
    '0 0 35px rgba(0,170,255,0.35)',

  border:
    '1px solid rgba(255,255,255,0.08)'
};

const secondaryBtn = {

  display: 'flex',

  alignItems: 'center',

  gap: 10,

  padding:
    isMobile

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
    isMobile
      ? 14
      : 16
};

const cameraWrap = {

  marginTop:
    isMobile
      ? 20
      : 10,

  marginBottom:
    isMobile
      ? 10
      : 20,

  transform:
    isMobile

      ? 'scale(0.72)'

      : 'scale(0.9)'
};

const statsContainer = {

  display: 'grid',

  gridTemplateColumns:
    isMobile

      ? '1fr'

      : 'repeat(auto-fit,minmax(220px,1fr))',

  gap: 20,

  width: '100%',

  maxWidth: 900,

  marginTop:
    isMobile
      ? 30
      : 45
};

const statCard = {

  padding:
    isMobile
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

const socialFloat = {

  position: 'fixed',

  right:
    isMobile
      ? 14
      : 25,

  bottom:
    isMobile
      ? 18
      : 30,

  display: 'flex',

  flexDirection: 'column',

  gap: 14,

  zIndex: 999
};

const socialBtn = {

  width: 52,

  height: 52,

  borderRadius: '50%',

  display: 'flex',

  alignItems: 'center',

  justifyContent: 'center',

  background:
    'rgba(0,170,255,0.12)',

  border:
    '1px solid rgba(255,255,255,0.08)',

  color: '#00aaff',

  fontSize: 20,

  textDecoration: 'none',

  backdropFilter:
    'blur(12px)',

  boxShadow:
    '0 0 25px rgba(0,170,255,0.2)'
};