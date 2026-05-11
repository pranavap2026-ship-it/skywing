import React, {
  useState,
  useEffect
} from 'react';

import {
  FaLock,
  FaUnlockAlt
} from 'react-icons/fa';

// ===============================
// 🔐 SECRET CODE
// ===============================
const SECRET_HASH =
  btoa('SKYWING#2820');

// ===============================
// 🚀 COMPONENT
// ===============================
export default function EventAccessGate({
  children
}) {

  const [input, setInput] =
    useState('');

  const [granted, setGranted] =
    useState(false);

  const [error, setError] =
    useState('');

  // ===============================
  // 🔄 LOAD ACCESS
  // ===============================
  useEffect(() => {

    const saved =
      localStorage.getItem(
        'skywing_event_access'
      );

    if (saved === 'granted') {

      setGranted(true);
    }

  }, []);

  // ===============================
  // 🔓 VERIFY
  // ===============================
  const verify = () => {

    const encoded =
      btoa(input.trim());

    if (encoded === SECRET_HASH) {

      localStorage.setItem(
        'skywing_event_access',
        'granted'
      );

      setGranted(true);

      setError('');

    } else {

      setError(
        'Invalid access code'
      );
    }
  };

  // ===============================
  // ⌨️ ENTER KEY
  // ===============================
  const handleKeyDown = (e) => {

    if (e.key === 'Enter') {
      verify();
    }
  };

  // ===============================
  // ✅ ACCESS GRANTED
  // ===============================
  if (granted) {

    return children;
  }

  // ===============================
  // 🔒 LOCK SCREEN
  // ===============================
  return (

    <div style={styles.wrapper}>

      <div style={styles.card}>

        {/* ICON */}
        <div style={styles.iconWrap}>

          <FaLock />

        </div>

        {/* TITLE */}
        <h1 style={styles.title}>

          EVENT ACCESS

        </h1>

        {/* DESC */}
        <p style={styles.desc}>

          This section is protected.
          Enter secure access code.

        </p>

        {/* INPUT */}
        <input
          type="password"

          placeholder="Enter access code"

          value={input}

          onChange={(e) =>
            setInput(
              e.target.value
            )
          }

          onKeyDown={
            handleKeyDown
          }

          style={styles.input}
        />

        {/* ERROR */}
        {error && (

          <p style={styles.error}>

            {error}

          </p>
        )}

        {/* BUTTON */}
        <button
          onClick={verify}
          style={styles.button}
        >

          <FaUnlockAlt />

          Unlock Events

        </button>

      </div>

    </div>
  );
}

// ===============================
// 🎨 STYLES
// ===============================
const styles = {

  wrapper: {

    minHeight: '100vh',

    display: 'flex',

    justifyContent:
      'center',

    alignItems: 'center',

    padding: 20
  },

  card: {

    width: '100%',

    maxWidth: 450,

    padding: 35,

    borderRadius: 28,

    background:
      'rgba(255,255,255,0.04)',

    border:
      '1px solid rgba(0,170,255,0.15)',

    backdropFilter:
      'blur(18px)',

    textAlign: 'center'
  },

  iconWrap: {

    width: 90,

    height: 90,

    margin:
      '0 auto 25px',

    borderRadius: '50%',

    display: 'flex',

    justifyContent:
      'center',

    alignItems: 'center',

    fontSize: 36,

    color: '#00aaff',

    background:
      'rgba(0,170,255,0.08)'
  },

  title: {

    color: '#fff',

    fontSize: '2rem',

    marginBottom: 15,

    letterSpacing: 3,

    fontFamily:
      'Orbitron,sans-serif'
  },

  desc: {

    color:
      'rgba(255,255,255,0.7)',

    lineHeight: 1.7,

    marginBottom: 25
  },

  input: {

    width: '100%',

    padding: 18,

    borderRadius: 18,

    border:
      '1px solid rgba(255,255,255,0.08)',

    background:
      'rgba(255,255,255,0.03)',

    color: '#fff',

    outline: 'none',

    marginBottom: 18
  },

  button: {

    width: '100%',

    padding: 18,

    border: 'none',

    borderRadius: 18,

    background:
      'linear-gradient(135deg,#00aaff,#0066ff)',

    color: '#fff',

    fontSize: 15,

    display: 'flex',

    justifyContent:
      'center',

    alignItems: 'center',

    gap: 10,

    cursor: 'pointer'
  },

  error: {

    color: '#ff4d6d',

    marginBottom: 16
  }
};