import React, { useEffect, useState } from 'react';
import { eventsAPI } from '../api';

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
// 🔧 SAFE DATA EXTRACTOR
// ===============================
const extractData = (res) =>
  Array.isArray(res.data) ? res.data : res.data?.data || [];

// ===============================
// 📅 COMPONENT
// ===============================
export default function Events() {
  const [events, setEvents] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('all');

  const fetchEvents = async () => {
    try {
      setLoading(true);
      setError('');

      const res = await eventsAPI.getAll();
      const data = extractData(res);

      setEvents(data);
      setFiltered(data);
    } catch (err) {
      console.error(err);
      setError('Failed to load events');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  // ===============================
  // 🔍 FILTER LOGIC
  // ===============================
  useEffect(() => {
    let data = [...events];

    if (search) {
      data = data.filter(ev =>
        ev.title.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (category !== 'all') {
      data = data.filter(ev => ev.category === category);
    }

    setFiltered(data);
  }, [search, category, events]);

  // ===============================
  // ⏳ LOADING
  // ===============================
  if (loading) {
    return (
      <div className="page" style={centerStyle}>
        LOADING EVENTS...
      </div>
    );
  }

  // ===============================
  // ❌ ERROR + RETRY
  // ===============================
  if (error) {
    return (
      <div className="page" style={{ textAlign:'center', padding:'80px 0' }}>
        <p style={{ color:'red', marginBottom:20 }}>{error}</p>
        <button className="btn btn-primary" onClick={fetchEvents}>
          Retry
        </button>
      </div>
    );
  }

  // ===============================
  // 🎯 UI
  // ===============================
  return (
    <div className="page">
      <div className="section-label">// gallery & archives</div>
      <h2 className="section-title">OUR EVENTS</h2>

      {/* 🔍 SEARCH + FILTER */}
      <div style={{ marginBottom: 30, display:'flex', gap:10, flexWrap:'wrap' }}>
        <input
          className="form-input"
          placeholder="Search events..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />

        <select
          className="form-input"
          value={category}
          onChange={e => setCategory(e.target.value)}
        >
          <option value="all">All</option>
          {Object.keys(CATEGORY_ICONS).map(c => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
      </div>

      {/* 📊 STATS */}
      <div className="stats-row">
        <div className="stat">
          <h2>{events.length}</h2>
          <p>Events Archived</p>
        </div>
        <div className="stat">
          <h2>12K</h2>
          <p>Photos Shot</p>
        </div>
        <div className="stat">
          <h2>200+</h2>
          <p>Videos Made</p>
        </div>
      </div>

      {/* EMPTY */}
      {filtered.length === 0 ? (
        <div style={emptyStyle}>
          NO EVENTS FOUND
        </div>
      ) : (
        <div className="grid-2">
          {filtered.map((ev, i) => (
            <a
              key={ev._id}
              href={ev.driveLink}
              target="_blank"
              rel="noreferrer"
              className="card fade-up"
              style={{
                display: 'block',
                textDecoration: 'none',
                animationDelay: `${i * 0.08}s`,
                borderTopColor: ev.coverColor || 'var(--blue)'
              }}
            >
              {/* ICON */}
              <span style={iconStyle}>
                {ev.icon || CATEGORY_ICONS[ev.category] || '📸'}
              </span>

              {/* TITLE */}
              <h3 style={titleStyle}>
                {ev.title}
              </h3>

              {/* DATE */}
              {ev.date && (
                <p style={{ fontSize:12, color:'var(--gray)' }}>
                  {new Date(ev.date).toDateString()}
                </p>
              )}

              {/* DESC */}
              <p style={descStyle}>
                {ev.description}
              </p>

              {/* CTA */}
              <span style={ctaStyle}>
                Open Drive Gallery →
              </span>
            </a>
          ))}
        </div>
      )}
    </div>
  );
}

// ===============================
// 🎨 STYLES
// ===============================
const centerStyle = {
  display:'flex',
  alignItems:'center',
  justifyContent:'center',
  height:'100vh',
  fontFamily:'Orbitron',
  color:'var(--blue)',
  letterSpacing:4
};

const emptyStyle = {
  textAlign:'center',
  padding:'80px 0',
  color:'var(--gray)',
  fontFamily:'Space Mono',
  letterSpacing:3
};

const iconStyle = {
  fontSize:38,
  display:'block',
  marginBottom:16
};

const titleStyle = {
  fontFamily:'Orbitron,sans-serif',
  fontSize:15,
  letterSpacing:2,
  marginBottom:8
};

const descStyle = {
  color:'var(--gray)',
  fontSize:14,
  lineHeight:1.7,
  marginBottom:16
};

const ctaStyle = {
  fontFamily:'Space Mono,monospace',
  fontSize:10,
  letterSpacing:2,
  color:'var(--blue-glow)'
};