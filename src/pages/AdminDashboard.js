import React, {
  useState
} from 'react';

import {
  FaCalendarAlt,
  FaUsers,
  FaGlobe,
  FaSignOutAlt,
  FaBolt
} from 'react-icons/fa';

import {
  motion,
  AnimatePresence
} from 'framer-motion';

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

// ===============================
// 📱 MOBILE
// ===============================
const isMobile =
  window.innerWidth <= 768;

// ===============================
// 🚀 COMPONENT
// ===============================
export default function AdminDashboard() {

  const { logout } =
    useAuth();

  const [tab, setTab] =
    useState('events');

  // ===============================
  // 📑 TABS
  // ===============================
  const tabs = [

    {
      id: 'events',
      label: 'Events',
      icon: <FaCalendarAlt />
    },

    {
      id: 'members',
      label: 'Members',
      icon: <FaUsers />
    },

    {
      id: 'social',
      label: 'Social',
      icon: <FaGlobe />
    }
  ];

  return (

    <div style={styles.page}>

      {/* BG GLOWS */}
      <div style={styles.glow1} />
      <div style={styles.glow2} />

      {/* HEADER */}
      <motion.div

        initial={{
          opacity: 0,
          y: -20
        }}

        animate={{
          opacity: 1,
          y: 0
        }}

        style={styles.header}
      >

        {/* LOGO */}
        <img
          src={logo}
          alt="SkyWing"

          style={styles.logo}
        />

        {/* STATUS */}
        {!isMobile && (

          <div style={styles.status}>

            <FaBolt />

            <span>
              SYSTEM ACTIVE
            </span>

          </div>
        )}

      </motion.div>

      {/* TITLE */}
      <motion.div

        initial={{
          opacity: 0,
          y: 20
        }}

        animate={{
          opacity: 1,
          y: 0
        }}

        transition={{
          delay: 0.1
        }}

        style={styles.hero}
      >

        <p style={styles.subTitle}>
          // CONTROL CENTER
        </p>

        <h1 style={styles.title}>
          ADMIN DASHBOARD
        </h1>

      </motion.div>

      {/* TABS */}
      <div style={styles.tabsWrap}>

        <div style={styles.leftTabs}>

          {tabs.map((item) => (

            <button

              key={item.id}

              onClick={() =>
                setTab(item.id)
              }

              style={{
                ...styles.tabBtn,

                ...(tab === item.id

                  ? styles.activeTab

                  : {})
              }}
            >

              {item.icon}

              <span>
                {item.label}
              </span>

            </button>
          ))}

        </div>

        {/* LOGOUT */}
        <button

          onClick={logout}

          style={styles.logoutBtn}
        >

          <FaSignOutAlt />

          Logout

        </button>

      </div>

      {/* CONTENT */}
      <div style={styles.panelWrap}>

        <AnimatePresence mode="wait">

          <motion.div

            key={tab}

            initial={{
              opacity: 0,
              y: 15
            }}

            animate={{
              opacity: 1,
              y: 0
            }}

            exit={{
              opacity: 0,
              y: -15
            }}

            transition={{
              duration: 0.25
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
const styles = {

  page: {

    minHeight: '100vh',

    padding:
      isMobile
        ? '110px 14px 80px'
        : '120px 40px 80px',

    position: 'relative',

    overflow: 'hidden'
  },

  // ===============================
  // GLOWS
  // ===============================
  glow1: {

    position: 'absolute',

    top: -120,

    left: -120,

    width: 350,

    height: 350,

    borderRadius: '50%',

    background:
      'rgba(0,170,255,0.14)',

    filter:
      'blur(120px)',

    pointerEvents: 'none'
  },

  glow2: {

    position: 'absolute',

    bottom: -100,

    right: -100,

    width: 300,

    height: 300,

    borderRadius: '50%',

    background:
      'rgba(0,120,255,0.12)',

    filter:
      'blur(120px)',

    pointerEvents: 'none'
  },

  // ===============================
  // HEADER
  // ===============================
  header: {

    display: 'flex',

    justifyContent:
      'space-between',

    alignItems: 'center',

    marginBottom: 35,

    position: 'relative',

    zIndex: 5
  },

  logo: {

    width:
      isMobile
        ? 110
        : 170,

    objectFit: 'contain',

    filter:
      'drop-shadow(0 0 18px rgba(0,170,255,0.35))'
  },

  status: {

    display: 'flex',

    alignItems: 'center',

    gap: 10,

    padding:
      '12px 18px',

    borderRadius: 14,

    color: '#00d4ff',

    fontSize: 12,

    letterSpacing: 2,

    border:
      '1px solid rgba(0,170,255,0.18)',

    background:
      'rgba(255,255,255,0.04)',

    backdropFilter:
      'blur(10px)'
  },

  // ===============================
  // HERO
  // ===============================
  hero: {

    marginBottom:
      isMobile
        ? 28
        : 40
  },

  subTitle: {

    color: '#00d4ff',

    letterSpacing: 4,

    marginBottom: 12,

    fontSize: 12
  },

  title: {

    fontSize:
      isMobile
        ? '2.2rem'
        : '5rem',

    lineHeight: 1,

    letterSpacing:
      isMobile
        ? 2
        : 5,

    fontFamily:
      'Orbitron,sans-serif',

    background:
      'linear-gradient(135deg,#fff,#00aaff)',

    WebkitBackgroundClip:
      'text',

    WebkitTextFillColor:
      'transparent'
  },

  // ===============================
  // TABS
  // ===============================
  tabsWrap: {

    display: 'flex',

    flexDirection:
      isMobile
        ? 'column'
        : 'row',

    justifyContent:
      'space-between',

    gap: 12,

    marginBottom: 30,

    position: 'relative',

    zIndex: 50
  },

  leftTabs: {

    display: 'flex',

    flexDirection:
      isMobile
        ? 'column'
        : 'row',

    gap: 12,

    width:
      isMobile
        ? '100%'
        : 'auto'
  },

  tabBtn: {

    display: 'flex',

    alignItems: 'center',

    justifyContent: 'center',

    gap: 10,

    width:
      isMobile
        ? '100%'
        : 'auto',

    minHeight: 56,

    padding:
      isMobile
        ? '14px 18px'
        : '15px 24px',

    borderRadius: 18,

    border:
      '1px solid rgba(255,255,255,0.08)',

    background:
      'rgba(255,255,255,0.05)',

    color: '#fff',

    cursor: 'pointer',

    backdropFilter:
      'blur(14px)',

    fontSize: 15,

    transition:
      '0.3s ease'
  },

  activeTab: {

    background:
      'linear-gradient(135deg,#00aaff,#0066ff)',

    boxShadow:
      '0 0 24px rgba(0,170,255,0.35)'
  },

  logoutBtn: {

    display: 'flex',

    alignItems: 'center',

    justifyContent: 'center',

    gap: 10,

    width:
      isMobile
        ? '100%'
        : 'auto',

    minHeight: 56,

    padding:
      isMobile
        ? '14px 18px'
        : '15px 24px',

    borderRadius: 18,

    border:
      '1px solid rgba(255,0,80,0.2)',

    background:
      'rgba(255,0,80,0.08)',

    color: '#ff4d7a',

    cursor: 'pointer',

    fontSize: 15
  },

  // ===============================
  // CONTENT
  // ===============================
  panelWrap: {

    position: 'relative',

    zIndex: 5
  }
};