import React, {
  useEffect,
  useState
} from 'react';

import {
  motion
} from 'framer-motion';

import {
  FaInstagram,
  FaUserGraduate,
  FaCrown,
  FaCamera,
  FaVideo
} from 'react-icons/fa';

import { membersAPI }
  from '../api';

// ===============================
// 🔧 SAFE DATA
// ===============================
const extractData = (res) =>
  Array.isArray(res.data)
    ? res.data
    : res.data?.data || [];

// ===============================
// 👥 TEAM PAGE
// ===============================
export default function Team() {

  const [members,
    setMembers] =
    useState([]);

  const [loading,
    setLoading] =
    useState(true);

  const [error,
    setError] =
    useState('');

  // ===============================
  // 📡 FETCH MEMBERS
  // ===============================
  const fetchMembers =
    async () => {

      try {

        setLoading(true);

        setError('');

        const res =
          await membersAPI.getAll();

        const data =
          extractData(res);

        // SORT
        const sorted =
          data.sort((a, b) => {

            if (
              a.isLeader &&
              !b.isLeader
            ) return -1;

            if (
              !a.isLeader &&
              b.isLeader
            ) return 1;

            return (
              (a.order || 0) -
              (b.order || 0)
            );
          });

        setMembers(sorted);

      } catch (err) {

        console.error(err);

        setError(
          'FAILED TO LOAD TEAM'
        );

      } finally {

        setLoading(false);
      }
    };

  useEffect(() => {

    fetchMembers();

  }, []);

  // ===============================
  // ⏳ LOADING
  // ===============================
  if (loading) {

    return (

      <div style={loadingWrap}>

        <div style={loader} />

        <h2 style={loadingText}>
          LOADING TEAM...
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
          onClick={fetchMembers}
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
          // THE CREW BEHIND THE LENS
        </p>

        <h1 style={title}>
          MEET THE TEAM
        </h1>

        <p style={desc}>

          Passionate creators,
          storytellers, photographers
          and editors building the
          visual identity of
          SkyWing Media Team.

        </p>

      </div>

      {/* EMPTY */}
      {members.length === 0 ? (

        <div style={emptyBox}>

          NO TEAM MEMBERS FOUND

        </div>

      ) : (

        <div style={grid}>

          {members.map(
            (m, i) => {

              const initials =
                m.name

                  ? m.name
                      .split(' ')
                      .map(
                        (n) =>
                          n[0]
                      )
                      .join('')
                      .toUpperCase()

                  : '👤';

              return (

                <motion.div

                  key={m._id || i}

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
                    scale: 1.02
                  }}

                  style={{
                    ...card,

                    border:
                      m.isLeader

                        ? '1px solid rgba(255,215,0,0.3)'

                        : '1px solid rgba(255,255,255,0.08)'
                  }}
                >

                  {/* CARD GLOW */}
                  <div
                    style={{
                      ...cardGlow,

                      background:
                        m.isLeader

                          ? 'radial-gradient(circle at top right, rgba(255,215,0,0.2), transparent 60%)'

                          : 'radial-gradient(circle at top right, rgba(0,170,255,0.18), transparent 60%)'
                    }}
                  />

                  {/* LEADER */}
                  {m.isLeader && (

                    <div
                      style={
                        leaderBadge
                      }
                    >

                      <FaCrown />

                      LEAD

                    </div>
                  )}

                  {/* PHOTO */}
                  <div
                    style={{
                      ...avatar,

                      border:
                        m.isLeader

                          ? '2px solid #ffd700'

                          : '2px solid #00aaff',

                      boxShadow:
                        m.isLeader

                          ? '0 0 35px rgba(255,215,0,0.25)'

                          : '0 0 30px rgba(0,170,255,0.25)'
                    }}
                  >

                    {m.photo ? (

                      <img
                        src={m.photo}
                        alt={m.name}

                        style={
                          avatarImg
                        }
                      />

                    ) : (

                      <span>

                        {m.photoEmoji ||
                          initials}

                      </span>
                    )}

                  </div>

                  {/* NAME */}
                  <h2 style={nameText}>

                    {m.name}

                  </h2>

                  {/* ROLE */}
                  <div
                    style={{
                      ...roleText,

                      color:
                        m.isLeader

                          ? '#ffd700'

                          : '#00aaff'
                    }}
                  >

                    {m.role}

                  </div>

                  {/* CLASS */}
                  {m.className && (

                    <div
                      style={
                        classText
                      }
                    >

                      <FaUserGraduate />

                      {m.className}

                    </div>
                  )}

                  {/* BIO */}
                  <p style={bioText}>

                    {m.bio ||
                      'Creative member of SkyWing Media Team.'}

                  </p>

                  {/* SKILLS */}
                  <div style={skillsWrap}>

                    <div style={skillTag}>

                      <FaCamera />

                      Photo

                    </div>

                    <div style={skillTag}>

                      <FaVideo />

                      Video

                    </div>

                  </div>

                  {/* SOCIAL */}
                  {m.instagramLink && (

                    <a
                      href={
                        m.instagramLink
                      }

                      target="_blank"

                      rel="noreferrer"

                      style={
                        instaBtn
                      }
                    >

                      <FaInstagram />

                      Instagram

                    </a>
                  )}

                </motion.div>
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

  lineHeight: 1.9
};

const grid = {

  display: 'grid',

  gridTemplateColumns:
    'repeat(auto-fit,minmax(320px,1fr))',

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
    '35px 28px',

  background:
    'rgba(255,255,255,0.04)',

  backdropFilter:
    'blur(18px)',

  textAlign: 'center'
};

const cardGlow = {

  position: 'absolute',

  inset: 0,

  pointerEvents: 'none'
};

const leaderBadge = {

  position: 'absolute',

  top: 18,

  right: 18,

  display: 'flex',

  alignItems: 'center',

  gap: 8,

  padding:
    '8px 14px',

  borderRadius: 999,

  fontSize: 11,

  letterSpacing: 1,

  background:
    'rgba(255,215,0,0.12)',

  border:
    '1px solid rgba(255,215,0,0.25)',

  color: '#ffd700'
};

const avatar = {

  width: 120,

  height: 120,

  borderRadius: '50%',

  margin:
    '0 auto 22px',

  display: 'flex',

  alignItems: 'center',

  justifyContent:
    'center',

  overflow: 'hidden',

  fontSize: 38,

  background:
    'linear-gradient(135deg,#0f172a,#111827)'
};

const avatarImg = {

  width: '100%',

  height: '100%',

  objectFit: 'cover'
};

const nameText = {

  color: '#fff',

  fontSize: 22,

  marginBottom: 8,

  fontFamily:
    'Orbitron,sans-serif',

  letterSpacing: 2
};

const roleText = {

  fontSize: 12,

  letterSpacing: 3,

  marginBottom: 16,

  textTransform:
    'uppercase'
};

const classText = {

  display: 'flex',

  alignItems: 'center',

  justifyContent:
    'center',

  gap: 8,

  color:
    'rgba(255,255,255,0.65)',

  marginBottom: 18,

  fontSize: 13
};

const bioText = {

  color:
    'rgba(255,255,255,0.72)',

  lineHeight: 1.8,

  fontSize: 14,

  marginBottom: 22
};

const skillsWrap = {

  display: 'flex',

  justifyContent:
    'center',

  gap: 12,

  flexWrap: 'wrap',

  marginBottom: 24
};

const skillTag = {

  display: 'flex',

  alignItems: 'center',

  gap: 8,

  padding:
    '10px 16px',

  borderRadius: 999,

  background:
    'rgba(255,255,255,0.05)',

  border:
    '1px solid rgba(255,255,255,0.08)',

  color: '#00d4ff',

  fontSize: 12
};

const instaBtn = {

  display: 'inline-flex',

  alignItems: 'center',

  gap: 10,

  padding:
    '12px 22px',

  borderRadius: 999,

  textDecoration: 'none',

  color: '#ff4fa3',

  border:
    '1px solid rgba(255,255,255,0.08)',

  background:
    'rgba(255,255,255,0.04)'
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

  top: -140,

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