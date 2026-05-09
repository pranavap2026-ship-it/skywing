import React, {
  useEffect,
  useState
} from 'react';

import {
  motion
} from 'framer-motion';

import {
  FaSearch,
  FaImages,
  FaVideo,
  FaCalendarAlt,
  FaArrowRight
} from 'react-icons/fa';

import { eventsAPI }
  from '../api';

// ===============================
// 🎯 CATEGORY ICONS
// ===============================
const CATEGORY_ICONS = {

  arts: '🎨',

  sports: '⚽',

  cultural: '🎭',

  tech: '💡',

  freshers: '🎓',

  farewell: '✨',

  other: '📸'
};

// ===============================
// 🔧 SAFE EXTRACT
// ===============================
const extractData = (res) =>
  Array.isArray(res.data)
    ? res.data
    : res.data?.data || [];

// ===============================
// 🚀 COMPONENT
// ===============================
export default function Events() {

  const [events,
    setEvents] =
    useState([]);

  const [filtered,
    setFiltered] =
    useState([]);

  const [loading,
    setLoading] =
    useState(true);

  const [error,
    setError] =
    useState('');

  const [search,
    setSearch] =
    useState('');

  const [category,
    setCategory] =
    useState('all');

  const isMobile =
    window.innerWidth <= 768;

  // ===============================
  // 📡 FETCH
  // ===============================
  const fetchEvents =
    async () => {

      try {

        setLoading(true);

        setError('');

        const res =
          await eventsAPI.getAll();

        const data =
          extractData(res);

        setEvents(data);

        setFiltered(data);

      } catch (err) {

        console.error(err);

        setError(
          'FAILED TO LOAD EVENTS'
        );

      } finally {

        setLoading(false);
      }
    };

  useEffect(() => {

    fetchEvents();

  }, []);

  // ===============================
  // 🔍 FILTER
  // ===============================
  useEffect(() => {

    let data =
      [...events];

    if (search) {

      data = data.filter(
        (ev) =>
          ev.title
            ?.toLowerCase()
            .includes(
              search.toLowerCase()
            )
      );
    }

    if (
      category !== 'all'
    ) {

      data = data.filter(
        (ev) =>
          ev.category ===
          category
      );
    }

    setFiltered(data);

  }, [
    search,
    category,
    events
  ]);

  // ===============================
  // ⏳ LOADING
  // ===============================
  if (loading) {

    return (

      <div style={loadingWrap}>

        <div style={loader} />

        <h2 style={loadingText}>
          LOADING EVENTS...
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
          onClick={
            fetchEvents
          }

          style={retryBtn}
        >
          RETRY
        </button>

      </div>
    );
  }

  return (

    <div style={container}>

      {/* GLOWS */}
      <div style={glow1} />
      <div style={glow2} />

      {/* HERO */}
      <div style={hero}>

        <p style={miniTitle}>
          // GALLERY ARCHIVES
        </p>

        <h1 style={title}>
          OUR EVENTS
        </h1>

        <p style={desc}>

          Explore cinematic
          captures, event
          galleries, sports
          highlights and
          unforgettable moments
          archived by SkyWing.

        </p>

      </div>

      {/* SEARCH */}
      <div style={controls}>

        {/* SEARCH */}
        <div style={searchWrap}>

          <FaSearch
            style={
              searchIcon
            }
          />

          <input

            value={search}

            onChange={(e) =>
              setSearch(
                e.target.value
              )
            }

            placeholder="Search events..."

            style={searchInput}
          />

        </div>

        {/* FILTER */}
        <select

          value={category}

          onChange={(e) =>
            setCategory(
              e.target.value
            )
          }

          style={selectStyle}
        >

          <option value="all">
            All Categories
          </option>

          {Object.keys(
            CATEGORY_ICONS
          ).map((c) => (

            <option
              key={c}
              value={c}
            >

              {c}

            </option>
          ))}
        </select>

      </div>

      {/* STATS */}
      <div style={statsGrid}>

        <div style={statCard}>

          <FaCalendarAlt
            style={statIcon}
          />

          <h2>
            {events.length}
          </h2>

          <p>
            Events Archived
          </p>

        </div>

        <div style={statCard}>

          <FaImages
            style={statIcon}
          />

          <h2>
            12K+
          </h2>

          <p>
            Photos Captured
          </p>

        </div>

        <div style={statCard}>

          <FaVideo
            style={statIcon}
          />

          <h2>
            200+
          </h2>

          <p>
            Videos Edited
          </p>

        </div>

      </div>

      {/* EMPTY */}
      {filtered.length === 0 ? (

        <div style={emptyBox}>

          NO EVENTS FOUND

        </div>

      ) : (

        <div style={grid}>

          {filtered.map(
            (ev, i) => (

              <motion.a

                key={
                  ev._id || i
                }

                href={
                  ev.driveLink
                }

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
                    i * 0.07
                }}

                whileHover={{
                  y: -10,
                  scale: 1.02
                }}

                style={{
                  ...card,

                  border:
                    `1px solid ${
                      ev.coverColor ||
                      '#00aaff35'
                    }`
                }}
              >

                {/* GLOW */}
                <div
                  style={{
                    ...cardGlow,

                    background:
                      `radial-gradient(circle at top right, ${
                        ev.coverColor ||
                        '#00aaff25'
                      }, transparent 60%)`
                  }}
                />

                {/* ICON */}
                <div
                  style={{
                    ...iconWrap,

                    border:
                      `1px solid ${
                        ev.coverColor ||
                        '#00aaff'
                      }`
                  }}
                >

                  <span
                    style={{
                      fontSize: 34
                    }}
                  >

                    {ev.icon ||

                      CATEGORY_ICONS[
                        ev.category
                      ] ||

                      '📸'}

                  </span>

                </div>

                {/* CONTENT */}
                <div
                  style={{
                    flex: 1
                  }}
                >

                  <h2
                    style={
                      cardTitle
                    }
                  >

                    {ev.title}

                  </h2>

                  {ev.date && (

                    <p
                      style={
                        dateText
                      }
                    >

                      {new Date(
                        ev.date
                      ).toDateString()}

                    </p>
                  )}

                  <p
                    style={
                      cardDesc
                    }
                  >

                    {ev.description}

                  </p>

                  {/* CTA */}
                  <div
                    style={
                      ctaWrap
                    }
                  >

                    <span>
                      Open Gallery
                    </span>

                    <FaArrowRight />

                  </div>

                </div>

              </motion.a>
            )
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

  marginBottom: 60,

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

const controls = {

  display: 'flex',

  gap: 18,

  flexWrap: 'wrap',

  justifyContent:
    'center',

  marginBottom: 40,

  position: 'relative',

  zIndex: 5
};

const searchWrap = {

  position: 'relative',

  width:
    window.innerWidth <= 768

      ? '100%'

      : 360
};

const searchIcon = {

  position: 'absolute',

  top: '50%',

  left: 18,

  transform:
    'translateY(-50%)',

  color:
    'rgba(255,255,255,0.5)'
};

const searchInput = {

  width: '100%',

  padding:
    '18px 20px 18px 52px',

  borderRadius: 18,

  border:
    '1px solid rgba(255,255,255,0.08)',

  background:
    'rgba(255,255,255,0.04)',

  backdropFilter:
    'blur(12px)',

  color: '#fff',

  outline: 'none',

  fontSize: 15
};

const selectStyle = {

  padding:
    '18px 22px',

  borderRadius: 18,

  border:
    '1px solid rgba(255,255,255,0.08)',

  background:
    'rgba(255,255,255,0.04)',

  backdropFilter:
    'blur(12px)',

  color: '#fff',

  outline: 'none',

  fontSize: 15,

  minWidth: 200
};

const statsGrid = {

  display: 'grid',

  gridTemplateColumns:
    'repeat(auto-fit,minmax(220px,1fr))',

  gap: 24,

  marginBottom: 60,

  position: 'relative',

  zIndex: 5
};

const statCard = {

  padding:
    '30px',

  borderRadius: 26,

  background:
    'rgba(255,255,255,0.04)',

  border:
    '1px solid rgba(255,255,255,0.06)',

  textAlign: 'center',

  backdropFilter:
    'blur(18px)'
};

const statIcon = {

  fontSize: 30,

  color: '#00d4ff',

  marginBottom: 16
};

const grid = {

  display: 'grid',

  gridTemplateColumns:
    'repeat(auto-fit,minmax(320px,1fr))',

  gap: 28,

  position: 'relative',

  zIndex: 5
};

const card = {

  position: 'relative',

  overflow: 'hidden',

  borderRadius: 28,

  padding:
    '28px',

  display: 'flex',

  gap: 22,

  textDecoration: 'none',

  background:
    'rgba(255,255,255,0.04)',

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

  flexShrink: 0,

  background:
    'rgba(255,255,255,0.04)'
};

const cardTitle = {

  color: '#fff',

  fontSize: 20,

  marginBottom: 10,

  fontFamily:
    'Orbitron,sans-serif',

  letterSpacing: 2
};

const dateText = {

  color:
    'rgba(255,255,255,0.55)',

  fontSize: 12,

  marginBottom: 14
};

const cardDesc = {

  color:
    'rgba(255,255,255,0.72)',

  lineHeight: 1.8,

  fontSize: 14,

  marginBottom: 18
};

const ctaWrap = {

  display: 'flex',

  alignItems: 'center',

  gap: 10,

  color: '#00d4ff',

  fontSize: 14,

  letterSpacing: 1
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