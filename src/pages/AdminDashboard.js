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

      {/* GLOW */}
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
                ? 120
                : 170
          }}
        />

        {/* STATUS */}
        <div style={styles.status}>

          <FaBolt />

          <span>
            SYSTEM ACTIVE
          </span>

        </div>

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
                ? '2.3rem'
                : '5rem'
          }}
        >

          ADMIN DASHBOARD

        </h1>

      </motion.div>

      {/* TABS */}
      <div
        style={{
          ...styles.tabsWrap,

          flexDirection:
            isMobile
              ? 'column'
              : 'row'
        }}
      >

        {/* LEFT TABS */}
        <div
          style={{
            ...styles.leftTabs,

            width:
              isMobile
                ? '100%'
                : 'auto'
          }}
        >

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

                    : {}),

                  width:
                    isMobile
                      ? '100%'
                      : 'auto'
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

          style={{
            ...styles.logoutBtn,

            width:
              isMobile
                ? '100%'
                : 'auto'
          }}
        >

          <FaSignOutAlt />

          <span>
            Logout
          </span>

        </button>

      </div>

      {/* PANEL */}
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

        ? '120px 16px 60px'

        : '120px 40px 70px',

    position: 'relative',

    overflow: 'hidden',

    zIndex: 5
  },

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

  header: {

    display: 'flex',

    justifyContent:
      'space-between',

    alignItems: 'center',

    gap: 20,

    flexWrap: 'wrap',

    marginBottom: 40
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

  titleWrap: {

    marginBottom: 35
  },

  subTitle: {

    color: '#00d4ff',

    letterSpacing: 4,

    marginBottom: 12,

    fontSize: 12
  },

  title: {

    fontFamily:
      'Orbitron,sans-serif',

    lineHeight: 1,

    letterSpacing: 4,

    background:
      'linear-gradient(135deg,#fff,#00aaff)',

    WebkitBackgroundClip:
      'text',

    WebkitTextFillColor:
      'transparent'
  },

  tabsWrap: {

    display: 'flex',

    justifyContent:
      'space-between',

    gap: 18,

    marginBottom: 35,

    position: 'relative',

    zIndex: 30
  },

  leftTabs: {

    display: 'flex',

    gap: 14,

    flexWrap: 'wrap'
  },

  tabBtn: {

    display: 'flex',

    alignItems: 'center',

    justifyContent: 'center',

    gap: 10,

    padding:
      '16px 24px',

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
      '0.3s ease',

    minHeight: 58
  },

  activeTab: {

    background:
      'linear-gradient(135deg,#00aaff,#0066ff)',

    boxShadow:
      '0 0 25px rgba(0,170,255,0.35)'
  },

  logoutBtn: {

    display: 'flex',

    alignItems: 'center',

    justifyContent: 'center',

    gap: 10,

    padding:
      '16px 24px',

    borderRadius: 18,

    border:
      '1px solid rgba(255,0,80,0.22)',

    background:
      'rgba(255,0,80,0.08)',

    color: '#ff4d7a',

    cursor: 'pointer',

    fontSize: 15,

    minHeight: 58
  },

  panelWrap: {

    position: 'relative',

    zIndex: 10,

    width: '100%'
  }
};