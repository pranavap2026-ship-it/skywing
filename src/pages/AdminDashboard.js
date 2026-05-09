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

  const [tab,
    setTab] =
    useState('events');

  const isMobile =
    window.innerWidth <= 768;

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

      {/* GLOWS */}
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

          style={{
            ...styles.logo,

            width:
              isMobile
                ? 110
                : 170
          }}
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

      {/* HERO */}
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

        style={styles.titleWrap}
      >

        <p style={styles.subTitle}>
          // CONTROL CENTER
        </p>

        <h1
          style={{
            ...styles.title,

            fontSize:
              isMobile
                ? '2.2rem'
                : '5rem'
          }}
        >

          ADMIN DASHBOARD

        </h1>

      </motion.div>

      {/* RESPONSIVE TABS */}
      <div style={styles.tabsWrap}>

        <div style={styles.leftTabs}>

          {tabs.map(
            (item) => (

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
            )
          )}

        </div>

        {/* LOGOUT */}
        <button

          onClick={logout}

          style={styles.logoutBtn}
        >

          <FaSignOutAlt />

          <span>
            Logout
          </span>

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
      window.innerWidth <= 768

        ? '110px 14px 60px'

        : '120px 40px 70px',

    position: 'relative',

    overflow: 'hidden',

    zIndex: 1
  },

  // ===============================
  // 🌌 GLOW EFFECTS
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

    pointerEvents: 'none',

    zIndex: 0
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

    pointerEvents: 'none',

    zIndex: 0
  },

  // ===============================
  // HEADER
  // ===============================
  header: {

    position: 'relative',

    zIndex: 50,

    display: 'flex',

    justifyContent:
      'space-between',

    alignItems: 'center',

    gap: 20,

    marginBottom: 35
  },

  logo: {

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
  titleWrap: {

    marginBottom:
      window.innerWidth <= 768
        ? 25
        : 35
  },

  subTitle: {

    color: '#00d4ff',

    letterSpacing: 4,

    marginBottom: 10,

    fontSize: 12
  },

  title: {

    fontFamily:
      'Orbitron,sans-serif',

    lineHeight: 1.05,

    letterSpacing:
      window.innerWidth <= 768
        ? 2
        : 5,

    background:
      'linear-gradient(135deg,#fff,#00aaff)',

    WebkitBackgroundClip:
      'text',

    WebkitTextFillColor:
      'transparent'
  },

  // ===============================
  // MOBILE TABS FIX
  // ===============================
tabsWrap: {

  position:
    window.innerWidth <= 768
      ? 'relative'
      : 'sticky',

  top:
    window.innerWidth <= 768
      ? 'unset'
      : 85,

  zIndex: 100,

  display: 'flex',

  flexDirection:
    window.innerWidth <= 768
      ? 'column'
      : 'row',

  justifyContent:
    'space-between',

  gap: 12,

  marginBottom:
    window.innerWidth <= 768
      ? 40
      : 35,

  background:
    window.innerWidth <= 768

      ? 'transparent'

      : 'rgba(0,0,0,0.35)',

  backdropFilter:
    window.innerWidth <= 768

      ? 'none'

      : 'blur(18px)',

  padding:
    window.innerWidth <= 768
      ? '0'
      : '12px',

  borderRadius: 24,

  width: '100%'
},
  // ===============================
  // TAB BUTTONS
  // ===============================
  tabBtn: {

    position: 'relative',

    zIndex: 999,

    width:
      window.innerWidth <= 768
        ? '100%'
        : 'auto',

    minHeight:
      window.innerWidth <= 768
        ? 54
        : 58,

    padding:
      window.innerWidth <= 768
        ? '14px 18px'
        : '16px 24px',

    borderRadius: 18,

    border:
      '1px solid rgba(255,255,255,0.08)',

    background:
      'rgba(255,255,255,0.05)',

    color: '#fff',

    display: 'flex',

    alignItems: 'center',

    justifyContent: 'center',

    gap: 10,

    cursor: 'pointer',

    backdropFilter:
      'blur(14px)',

    fontSize:
      window.innerWidth <= 768
        ? 15
        : 15,

    transition:
      '0.3s ease',

    pointerEvents: 'auto'
  },

  activeTab: {

    background:
      'linear-gradient(135deg,#00aaff,#0066ff)',

    boxShadow:
      '0 0 24px rgba(0,170,255,0.35)'
  },

  // ===============================
  // LOGOUT
  // ===============================
  logoutBtn: {

    position: 'relative',

    zIndex: 999,

    width:
      window.innerWidth <= 768
        ? '100%'
        : 'auto',

    minHeight:
      window.innerWidth <= 768
        ? 54
        : 58,

    padding:
      window.innerWidth <= 768
        ? '14px 18px'
        : '16px 24px',

    borderRadius: 18,

    border:
      '1px solid rgba(255,0,80,0.22)',

    background:
      'rgba(255,0,80,0.08)',

    color: '#ff4d7a',

    display: 'flex',

    alignItems: 'center',

    justifyContent: 'center',

    gap: 10,

    cursor: 'pointer',

    fontSize: 15,

    pointerEvents: 'auto'
  },

  // ===============================
  // CONTENT PANEL
  // ===============================
panelWrap: {

  position: 'relative',

  zIndex: 10,

  width: '100%',

  marginTop:
    window.innerWidth <= 768
      ? 20
      : 0,

  overflow: 'hidden'
}
};