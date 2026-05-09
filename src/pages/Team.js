import React, {
  useEffect,
  useState
} from 'react';

import {
  FaInstagram,
  FaUserGraduate,
  FaCrown
} from 'react-icons/fa';

import { membersAPI } from '../api';

// ===============================
// 🔧 SAFE DATA EXTRACTOR
// ===============================
const extractData = (res) =>
  Array.isArray(res.data)
    ? res.data
    : res.data?.data || [];

// ===============================
// 👥 TEAM COMPONENT
// ===============================
export default function Team() {

  const [members, setMembers] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
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

        // ✅ SORT MEMBERS
        const sorted =
          data.sort((a, b) => {

            // 👑 leader first
            if (
              a.isLeader &&
              !b.isLeader
            ) return -1;

            if (
              !a.isLeader &&
              b.isLeader
            ) return 1;

            // 🔢 order sorting
            return (
              (a.order || 0) -
              (b.order || 0)
            );
          });

        setMembers(sorted);

      } catch (err) {

        console.error(err);

        setError(
          'Failed to load team members'
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
        LOADING TEAM...
      </div>
    );
  }

  // ===============================
  // ❌ ERROR
  // ===============================
  if (error) {

    return (
      <div
        className="page"
        style={{
          textAlign: 'center',
          padding: '80px 0',
          fontFamily:
            'Space Mono'
        }}
      >
        <p
          style={{
            color: 'red',
            marginBottom: 20
          }}
        >
          {error}
        </p>

        <button
          className="btn btn-primary"
          onClick={fetchMembers}
        >
          Retry
        </button>
      </div>
    );
  }

  // ===============================
  // 🎯 MAIN UI
  // ===============================
  return (
    <div className="page">

      <div className="section-label">
        // the crew behind the lens
      </div>

      <h2 className="section-title">
        MEET THE TEAM
      </h2>

      {/* EMPTY */}
      {members.length === 0 ? (

        <div
          style={{
            textAlign: 'center',
            padding: '80px 0',
            color: 'var(--gray)',
            fontFamily:
              'Space Mono',
            fontSize: 13,
            letterSpacing: 3
          }}
        >
          NO TEAM MEMBERS ADDED YET
        </div>

      ) : (

        <div className="grid-3">

          {members.map((m, i) => {

            const initials =
              m.name
                ? m.name
                    .split(' ')
                    .map(
                      (n) => n[0]
                    )
                    .join('')
                    .toUpperCase()
                : '👤';

            return (

              <div
                key={m._id}
                className="card fade-up"
                style={{
                  textAlign: 'center',
                  animationDelay:
                    `${i * 0.08}s`,
                  transition:
                    '0.35s ease',
                  position:
                    'relative',
                  overflow:
                    'hidden',
                  border:
                    m.isLeader
                      ? '1px solid rgba(255,215,0,0.35)'
                      : '1px solid rgba(255,255,255,0.06)'
                }}
              >

                {/* GLOW */}
                <div
                  style={{
                    position:
                      'absolute',
                    inset: 0,
                    background:
                      m.isLeader
                        ? 'radial-gradient(circle at top right, rgba(255,215,0,0.18), transparent 60%)'
                        : 'radial-gradient(circle at top right, rgba(0,170,255,0.15), transparent 60%)',
                    pointerEvents:
                      'none'
                  }}
                />

                {/* LEADER BADGE */}
                {m.isLeader && (

                  <div
                    style={{
                      position:
                        'absolute',
                      top: 14,
                      right: 14,
                      background:
                        'rgba(255,215,0,0.12)',
                      border:
                        '1px solid rgba(255,215,0,0.25)',
                      color:
                        '#ffd700',
                      padding:
                        '6px 10px',
                      borderRadius: 30,
                      display:
                        'flex',
                      alignItems:
                        'center',
                      gap: 6,
                      fontSize: 11,
                      letterSpacing: 1
                    }}
                  >
                    <FaCrown />

                    LEADER
                  </div>
                )}

                {/* PHOTO */}
                <div
                  style={{
                    width: 100,
                    height: 100,
                    borderRadius:
                      '50%',
                    margin:
                      '0 auto 18px',
                    border:
                      m.isLeader
                        ? '2px solid #ffd700'
                        : '2px solid var(--blue)',
                    display: 'flex',
                    alignItems:
                      'center',
                    justifyContent:
                      'center',
                    fontSize: 30,
                    background:
                      'linear-gradient(135deg,var(--dark),var(--darker))',
                    boxShadow:
                      m.isLeader
                        ? '0 0 30px rgba(255,215,0,0.25)'
                        : '0 0 25px rgba(0,170,255,0.25)',
                    overflow:
                      'hidden'
                  }}
                >

                  {m.photo ? (

                    <img
                      src={m.photo}
                      alt={m.name}
                      style={{
                        width:
                          '100%',
                        height:
                          '100%',
                        objectFit:
                          'cover'
                      }}
                    />

                  ) : (

                    <span>
                      {m.photoEmoji ||
                        initials}
                    </span>
                  )}
                </div>

                {/* NAME */}
                <h3
                  style={{
                    fontFamily:
                      'Orbitron,sans-serif',
                    fontSize: 14,
                    letterSpacing: 2,
                    marginBottom: 6
                  }}
                >
                  {m.name}
                </h3>

                {/* ROLE */}
                <div
                  style={{
                    fontFamily:
                      'Space Mono,monospace',
                    fontSize: 10,
                    letterSpacing: 2,
                    color:
                      m.isLeader
                        ? '#ffd700'
                        : 'var(--blue)',
                    textTransform:
                      'uppercase',
                    marginBottom: 10
                  }}
                >
                  {m.role}
                </div>

                {/* CLASS */}
                {m.className && (

                  <div
                    style={{
                      display:
                        'flex',
                      alignItems:
                        'center',
                      justifyContent:
                        'center',
                      gap: 6,
                      color:
                        'var(--gray)',
                      fontSize: 12,
                      marginBottom: 12
                    }}
                  >
                    <FaUserGraduate />

                    {m.className}
                  </div>
                )}

                {/* BIO */}
                <p
                  style={{
                    color:
                      'var(--gray)',
                    fontSize: 13,
                    lineHeight: 1.7,
                    marginBottom: 18
                  }}
                >
                  {m.bio ||
                    'No bio available'}
                </p>

                {/* INSTAGRAM */}
                {m.instagramLink && (

                  <a
                    href={
                      m.instagramLink
                    }
                    target="_blank"
                    rel="noreferrer"
                    style={{
                      display:
                        'inline-flex',
                      alignItems:
                        'center',
                      gap: 8,
                      padding:
                        '10px 18px',
                      border:
                        '1px solid rgba(255,255,255,0.08)',
                      borderRadius:
                        999,
                      textDecoration:
                        'none',
                      color:
                        '#ff4fa3',
                      fontSize: 13,
                      transition:
                        '0.3s'
                    }}
                  >
                    <FaInstagram />

                    Instagram
                  </a>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}