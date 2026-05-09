import React, {
  useEffect,
  useState
} from 'react';

import {
  motion
} from 'framer-motion';

import {
  FaTelegramPlane,
  FaInstagram,
  FaYoutube,
  FaFacebookF,
  FaLinkedinIn,
  FaGlobe,
  FaDiscord,
  FaGithub,
  FaTwitter,
  FaSnapchatGhost,
  FaPinterestP,
  FaWhatsapp,
  FaSpotify,
  FaTiktok,
  FaRedditAlien
} from 'react-icons/fa';

import { socialAPI }
  from '../api';

// ===============================
// 🚀 FALLBACK ICONS
// ===============================
const ICONS = {

  telegram:
    <FaTelegramPlane />,

  instagram:
    <FaInstagram />,

  youtube:
    <FaYoutube />,

  facebook:
    <FaFacebookF />,

  linkedin:
    <FaLinkedinIn />,

  website:
    <FaGlobe />,

  github:
    <FaGithub />,

  twitter:
    <FaTwitter />,

  x:
    <FaTwitter />,

  discord:
    <FaDiscord />,

  snapchat:
    <FaSnapchatGhost />,

  pinterest:
    <FaPinterestP />,

  whatsapp:
    <FaWhatsapp />,

  spotify:
    <FaSpotify />,

  tiktok:
    <FaTiktok />,

  reddit:
    <FaRedditAlien />
};

// ===============================
// 🔧 SAFE DATA
// ===============================
const extractData = (res) =>
  Array.isArray(res.data)
    ? res.data
    : res.data?.data || [];

// ===============================
// 🌐 COMPONENT
// ===============================
export default function Social() {

  const [links,
    setLinks] =
    useState([]);

  const [loading,
    setLoading] =
    useState(true);

  const [error,
    setError] =
    useState('');

  const isMobile =
    window.innerWidth <= 768;

  // ===============================
  // 📡 FETCH
  // ===============================
  const fetchSocial =
    async () => {

      try {

        setLoading(true);

        setError('');

        const res =
          await socialAPI.getAll();

        setLinks(
          extractData(res)
        );

      } catch (err) {

        console.error(err);

        setError(
          'FAILED TO LOAD LINKS'
        );

      } finally {

        setLoading(false);
      }
    };

  useEffect(() => {

    fetchSocial();

  }, []);

  // ===============================
  // ⏳ LOADING
  // ===============================
  if (loading) {

    return (

      <div style={loadingWrap}>

        <div style={loader} />

        <h2 style={loadingText}>
          CONNECTING...
        </h2>

      </div>
    );
  }

  // ===============================
  // ❌ ERROR
  // ===============================
  if (error) {

    return (

      <div style={errorWrap}>

        <h2 style={errorText}>
          {error}
        </h2>

        <button
          onClick={fetchSocial}
          style={retryBtn}
        >
          RETRY
        </button>

      </div>
    );
  }

  return (

    <div style={container}>

      {/* GLOW */}
      <div style={glow1} />
      <div style={glow2} />

      {/* HERO */}
      <div style={hero}>

        <p style={miniTitle}>
          // SKYWING NETWORK
        </p>

        <h1 style={title}>
          CONNECT WITH US
        </h1>

        <p style={desc}>

          Follow SkyWing Media Team
          across platforms for
          event updates, reels,
          announcements and
          cinematic moments.

        </p>

      </div>

      {/* EMPTY */}
      {links.length === 0 ? (

        <div style={emptyBox}>

          NO SOCIAL LINKS FOUND

        </div>

      ) : (

        <div style={grid}>

          {links.map(
            (item, i) => {

              const platform =
                item.platform
                  ?.toLowerCase();

              return (

                <motion.a

                  key={
                    item._id || i
                  }

                  href={item.url}

                  target="_blank"

                  rel="noreferrer"

                  initial={{
                    opacity: 0,
                    y: 40
                  }}

                  animate={{
                    opacity: 1,
                    y: 0
                  }}

                  transition={{
                    delay:
                      i * 0.08
                  }}

                  whileHover={{
                    y: -10,
                    scale: 1.03
                  }}

                  style={card}
                >

                  {/* CARD GLOW */}
                  <div
                    style={{
                      ...cardGlow,

                      background:
                        `radial-gradient(circle at top right, ${
                          item.color ||
                          '#00aaff'
                        }25, transparent 60%)`
                    }}
                  />

                  {/* ICON */}
                  <div
                    style={{
                      ...iconWrap,

                      border:
                        `1px solid ${
                          item.color ||
                          '#00aaff'
                        }`,

                      background:
                        `${item.color || '#00aaff'}15`,

                      boxShadow:
                        `0 0 30px ${
                          item.color || '#00aaff'
                        }35`
                    }}
                  >

                    <span
                      style={{
                        color:
                          item.color ||
                          '#00d4ff',

                        fontSize: 30,

                        display: 'flex',

                        alignItems: 'center',

                        justifyContent: 'center'
                      }}
                    >

                      {item.icon ? (

                        <span>
                          {item.icon}
                        </span>

                      ) : (

                        ICONS[
                          platform
                        ] ||

                        <FaGlobe />
                      )}

                    </span>

                  </div>

                  {/* CONTENT */}
                  <div
                    style={{
                      flex: 1
                    }}
                  >

                    <h3
                      style={
                        platformText
                      }
                    >

                      {item.platform ||
                        'SOCIAL'}

                    </h3>

                    <p
                      style={
                        handleText
                      }
                    >

                      {item.handle ||
                        item.url}

                    </p>

                  </div>

                  {/* STATUS */}
                  <div
                    style={{
                      ...statusBadge,

                      background:
                        `${item.color || '#00aaff'}18`
                    }}
                  >

                    ACTIVE

                  </div>

                </motion.a>
              );
            }
          )}
        </div>
      )}
    </div>
  );
}

// ===============================
// 🎨 STYLES
// ===============================

const container = {

  minHeight: '100vh',

  padding:
    window.innerWidth <= 768

      ? '120px 20px 60px'

      : '130px 40px 80px',

  position: 'relative',

  overflow: 'hidden'
};

const hero = {

  textAlign: 'center',

  marginBottom: 70,

  position: 'relative',

  zIndex: 5
};

const miniTitle = {

  color: '#00d4ff',

  letterSpacing: 4,

  fontSize: 13,

  marginBottom: 14
};

const title = {

  fontSize:
    window.innerWidth <= 768

      ? '3rem'

      : '5rem',

  fontFamily:
    'Orbitron,sans-serif',

  lineHeight: 1,

  letterSpacing: 5,

  background:
    'linear-gradient(135deg,#fff,#00aaff)',

  WebkitBackgroundClip:
    'text',

  WebkitTextFillColor:
    'transparent',

  marginBottom: 24
};

const desc = {

  maxWidth: 720,

  margin: '0 auto',

  color:
    'rgba(255,255,255,0.72)',

  lineHeight: 1.9,

  fontSize:
    window.innerWidth <= 768
      ? 14
      : 16
};

const grid = {

  display: 'grid',

  gridTemplateColumns:
    'repeat(auto-fit,minmax(300px,1fr))',

  gap: 28,

  maxWidth: 1300,

  margin: '0 auto',

  position: 'relative',

  zIndex: 5
};

const card = {

  position: 'relative',

  overflow: 'hidden',

  borderRadius: 30,

  padding:
    window.innerWidth <= 768

      ? '24px'

      : '30px',

  display: 'flex',

  alignItems: 'center',

  gap: 24,

  textDecoration: 'none',

  background:
    'rgba(255,255,255,0.04)',

  border:
    '1px solid rgba(255,255,255,0.06)',

  backdropFilter:
    'blur(18px)',

  transition:
    '0.35s ease'
};

const cardGlow = {

  position: 'absolute',

  inset: 0,

  pointerEvents: 'none'
};

const iconWrap = {

  width: 78,

  height: 78,

  borderRadius: '50%',

  display: 'flex',

  alignItems: 'center',

  justifyContent: 'center',

  flexShrink: 0
};

const platformText = {

  color: '#fff',

  fontSize: 18,

  marginBottom: 8,

  fontFamily:
    'Orbitron,sans-serif',

  letterSpacing: 2
};

const handleText = {

  color:
    'rgba(255,255,255,0.68)',

  fontSize: 14,

  lineHeight: 1.7,

  wordBreak: 'break-word'
};

const statusBadge = {

  padding:
    '8px 14px',

  borderRadius: 999,

  fontSize: 11,

  letterSpacing: 2,

  color: '#00d4ff',

  border:
    '1px solid rgba(255,255,255,0.08)',

  alignSelf: 'flex-start'
};

const glow1 = {

  position: 'absolute',

  width: 450,

  height: 450,

  borderRadius: '50%',

  background:
    'rgba(0,170,255,0.15)',

  filter:
    'blur(120px)',

  top: -150,

  left: -120,

  pointerEvents: 'none'
};

const glow2 = {

  position: 'absolute',

  width: 400,

  height: 400,

  borderRadius: '50%',

  background:
    'rgba(0,120,255,0.12)',

  filter:
    'blur(120px)',

  bottom: -120,

  right: -100,

  pointerEvents: 'none'
};

const loadingWrap = {

  height: '100vh',

  display: 'flex',

  flexDirection: 'column',

  alignItems: 'center',

  justifyContent: 'center',

  gap: 24
};

const loader = {

  width: 70,

  height: 70,

  border:
    '4px solid rgba(255,255,255,0.08)',

  borderTop:
    '4px solid #00aaff',

  borderRadius: '50%',

  animation:
    'spin 1s linear infinite'
};

const loadingText = {

  color: '#00d4ff',

  letterSpacing: 4
};

const errorWrap = {

  height: '100vh',

  display: 'flex',

  flexDirection: 'column',

  alignItems: 'center',

  justifyContent: 'center',

  gap: 24
};

const errorText = {

  color: '#ff4d7a'
};

const retryBtn = {

  padding:
    '14px 28px',

  borderRadius: 16,

  border: 'none',

  background:
    'linear-gradient(135deg,#00aaff,#0066ff)',

  color: '#fff',

  cursor: 'pointer',

  fontWeight: 700
};

const emptyBox = {

  textAlign: 'center',

  padding:
    '80px 20px',

  color:
    'rgba(255,255,255,0.55)',

  letterSpacing: 4
};