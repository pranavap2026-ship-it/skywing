import React, { useEffect, useState } from 'react';
import { socialAPI } from '../api';

// ===============================
// 🎯 DEFAULT ICONS
// ===============================
const PLATFORM_ICONS = {
  telegram: '📨',
  instagram: '📸',
  youtube: '▶️',
  facebook: '📘',
  twitter: '🐦',
  linkedin: '💼',
  website: '🌐'
};

// ===============================
// 🔧 SAFE DATA EXTRACTOR
// ===============================
const extractData = (res) =>
  Array.isArray(res.data) ? res.data : res.data?.data || [];

// ===============================
// 🌐 COMPONENT
// ===============================
export default function Social() {
  const [links, setLinks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchSocial = async () => {
    try {
      setLoading(true);
      setError('');

      const res = await socialAPI.getAll();
      const data = extractData(res);

      setLinks(data);
    } catch (err) {
      console.error(err);
      setError('Failed to load social links');
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
      <div
        className="page"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100vh',
          fontFamily: 'Orbitron',
          color: 'var(--blue)',
          letterSpacing: 4
        }}
      >
        LOADING LINKS...
      </div>
    );
  }

  // ===============================
  // ❌ ERROR + RETRY
  // ===============================
  if (error) {
    return (
      <div
        className="page"
        style={{
          textAlign: 'center',
          padding: '80px 0',
          fontFamily: 'Space Mono'
        }}
      >
        <p style={{ color: 'red', marginBottom: 20 }}>{error}</p>

        <button className="btn btn-primary" onClick={fetchSocial}>
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
      <div className="section-label">// stay connected</div>
      <h2 className="section-title">FIND US ON</h2>

      {links.length === 0 ? (
        <div
          style={{
            color: 'var(--gray)',
            fontFamily: 'Space Mono',
            fontSize: 13,
            letterSpacing: 3,
            padding: '60px 0',
            textAlign: 'center'
          }}
        >
          NO SOCIAL LINKS ADDED YET
        </div>
      ) : (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit,minmax(260px,1fr))',
            gap: 20,
            maxWidth: 900
          }}
        >
          {links.map((s, i) => {
            const platform = s.platform?.toLowerCase();

            return (
              <a
                key={s._id}
                href={s.url}
                target="_blank"
                rel="noreferrer"
                className="card fade-up"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 20,
                  textDecoration: 'none',
                  animationDelay: `${i * 0.08}s`
                }}
              >
                {/* ICON */}
                <div
                  style={{
                    width: 52,
                    height: 52,
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 22,
                    border: `1px solid ${s.color || 'var(--border)'}`,
                    background: `${s.color || '#00aaff'}18`,
                    flexShrink: 0
                  }}
                >
                  {s.icon ||
                    PLATFORM_ICONS[platform] ||
                    '🌐'}
                </div>

                {/* TEXT */}
                <div>
                  <h4
                    style={{
                      fontFamily: 'Orbitron,sans-serif',
                      fontSize: 13,
                      letterSpacing: 2,
                      marginBottom: 4
                    }}
                  >
                    {s.platform?.toUpperCase() || 'SOCIAL'}
                  </h4>

                  <p
                    style={{
                      fontFamily: 'Space Mono,monospace',
                      fontSize: 12,
                      color: 'var(--gray)'
                    }}
                  >
                    {s.handle || s.url}
                  </p>
                </div>
              </a>
            );
          })}
        </div>
      )}
    </div>
  );
}