import React, {
  useState
} from 'react';

import {
  motion,
  AnimatePresence
} from 'framer-motion';

import {
  FaCalendarAlt,
  FaUsers,
  FaGlobe,
  FaSignOutAlt,
  FaBolt
} from 'react-icons/fa';

import { useAuth }
  from '../context/AuthContext';

import EventsPanel
  from '../components/admin/EventsPanel';

import MembersPanel
  from '../components/admin/MembersPanel';

import SocialPanel
  from '../components/admin/SocialPanel';

import logo
  from '../assets/logo.png';

export default function AdminDashboard() {

  const { logout } =
    useAuth();

  const [tab, setTab] =
    useState('events');

  // ===============================
  // 🚀 TABS
  // ===============================
  const tabs = [

    {
      id: 'events',

      label: 'Events',

      icon:
        <FaCalendarAlt />
    },

    {
      id: 'members',

      label: 'Members',

      icon:
        <FaUsers />
    },

    {
      id: 'social',

      label: 'Social',

      icon:
        <FaGlobe />
    }
  ];

  return (

    <div style={page}>

      {/* ===============================
          🌌 GLOW
      =============================== */}
      <div style={glow1} />
      <div style={glow2} />

      {/* ===============================
          🚀 HEADER
      =============================== */}
      <div style={header}>

        {/* LOGO */}
        <div style={logoWrap}>

          <img
            src={logo}
            alt="SkyWing"

            style={logoStyle}
          />

        </div>

        {/* STATUS */}
        <div style={statusWrap}>

          <FaBolt />

          <span>
            SYSTEM ACTIVE
          </span>

        </div>
      </div>

      {/* ===============================
          🧠 TITLE
      =============================== */}
      <div style={titleWrap}>

        <p style={miniTitle}>
          // CONTROL PANEL
        </p>

        <h1 style={title}>
          ADMIN DASHBOARD
        </h1>

      </div>

      {/* ===============================
          🔥 TABS
      =============================== */}
      <div style={tabsWrap}>

        {tabs.map((item) => (

          <button
            key={item.id}

            onClick={() =>
              setTab(item.id)
            }

            style={{
              ...tabBtn,

              ...(tab === item.id
                ? activeTab
                : {})
            }}
          >

            {item.icon}

            <span>
              {item.label}
            </span>

          </button>
        ))}

        {/* LOGOUT */}
        <button
          onClick={logout}

          style={logoutBtn}
        >

          <FaSignOutAlt />

          <span>
            Logout
          </span>

        </button>

      </div>

      {/* ===============================
          📦 CONTENT
      =============================== */}
      <div style={panelWrap}>

        <AnimatePresence
          mode="wait"
        >

          <motion.div

            key={tab}

            initial={{
              opacity: 0,
              y: 20
            }}

            animate={{
              opacity: 1,
              y: 0
            }}

            exit={{
              opacity: 0,
              y: -20
            }}

            transition={{
              duration: 0.3
            }}
          >

            {tab === 'events' &&
              <EventsPanel />}

            {tab === 'members' &&
              <MembersPanel />}

            {tab === 'social' &&
              <SocialPanel />}

          </motion.div>

        </AnimatePresence>

      </div>
    </div>
  );
}

// ===============================
// 🎨 STYLES
// ===============================

const page = {

  minHeight: '100vh',

  padding:
    window.innerWidth <= 768

      ? '120px 20px 60px'

      : '130px 40px 60px',

  position: 'relative',

  overflow: 'hidden',

  zIndex: 5
};

const glow1 = {

  position: 'absolute',

  width: 400,

  height: 400,

  background:
    'rgba(0,170,255,0.12)',

  borderRadius: '50%',

  filter:
    'blur(120px)',

  top: -120,

  left: -120,

  pointerEvents: 'none'
};

const glow2 = {

  position: 'absolute',

  width: 350,

  height: 350,

  background:
    'rgba(0,120,255,0.10)',

  borderRadius: '50%',

  filter:
    'blur(120px)',

  bottom: -100,

  right: -100,

  pointerEvents: 'none'
};

const header = {

  display: 'flex',

  alignItems: 'center',

  justifyContent:
    'space-between',

  marginBottom: 50,

  flexWrap: 'wrap',

  gap: 20
};

const logoWrap = {

  display: 'flex',

  alignItems: 'center'
};

const logoStyle = {

  width:
    window.innerWidth <= 768
      ? 140
      : 180,

  objectFit: 'contain',

  filter:
    'drop-shadow(0 0 20px rgba(0,170,255,0.35))'
};

const statusWrap = {

  display: 'flex',

  alignItems: 'center',

  gap: 10,

  color: '#00d4ff',

  fontSize: 13,

  letterSpacing: 2,

  padding:
    '12px 18px',

  borderRadius: 14,

  background:
    'rgba(255,255,255,0.04)',

  border:
    '1px solid rgba(0,170,255,0.18)',

  backdropFilter:
    'blur(12px)'
};

const titleWrap = {

  marginBottom: 40
};

const miniTitle = {

  color: '#00d4ff',

  letterSpacing: 4,

  marginBottom: 14,

  fontSize: 13
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
    'transparent'
};

const tabsWrap = {

  display: 'flex',

  gap: 16,

  flexWrap: 'wrap',

  marginBottom: 40
};

const tabBtn = {

  display: 'flex',

  alignItems: 'center',

  gap: 10,

  padding:
    '16px 24px',

  borderRadius: 18,

  border:
    '1px solid rgba(255,255,255,0.08)',

  background:
    'rgba(255,255,255,0.04)',

  color: '#fff',

  cursor: 'pointer',

  backdropFilter:
    'blur(12px)',

  fontSize: 15,

  transition:
    '0.3s ease',

  zIndex: 50
};

const activeTab = {

  background:
    'linear-gradient(135deg,#00aaff,#0066ff)',

  boxShadow:
    '0 0 30px rgba(0,170,255,0.35)'
};

const logoutBtn = {

  display: 'flex',

  alignItems: 'center',

  gap: 10,

  padding:
    '16px 24px',

  borderRadius: 18,

  border:
    '1px solid rgba(255,0,80,0.2)',

  background:
    'rgba(255,0,80,0.08)',

  color: '#ff4d7a',

  cursor: 'pointer',

  fontSize: 15
};

const panelWrap = {

  position: 'relative',

  zIndex: 10
};