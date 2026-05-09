import React, { useState } from 'react';

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

  const { logout } = useAuth();

  const [tab, setTab] =
    useState('events');

  const isMobile =
    window.innerWidth <= 768;

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
      <div style={styles.header}>

        <img
          src={logo}
          alt="SkyWing"
          style={{
            ...styles.logo,
            width:
              isMobile
                ? 130
                : 170
          }}
        />

        <div style={styles.status}>

          <FaBolt />

          <span>
            SYSTEM ACTIVE
          </span>

        </div>
      </div>

      {/* TITLE */}
      <div style={styles.titleWrap}>

        <p style={styles.subTitle}>
          // CONTROL PANEL
        </p>

        <h1
          style={{
            ...styles.title,
            fontSize:
              isMobile
                ? '2.7rem'
                : '5rem'
          }}
        >
          ADMIN DASHBOARD
        </h1>

      </div>

      {/* TABS */}
      <div style={styles.tabsWrap}>

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

const styles = {

  page: {

    minHeight: '100vh',

    padding:
      window.innerWidth <= 768

        ? '120px 18px 50px'

        : '120px 40px 60px',

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
      'rgba(0,170,255,0.15)',

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

    flexWrap: 'wrap',

    gap: 20,

    marginBottom: 50
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

    fontSize: 13,

    letterSpacing: 2,

    border:
      '1px solid rgba(0,170,255,0.18)',

    background:
      'rgba(255,255,255,0.04)',

    backdropFilter:
      'blur(10px)'
  },

  titleWrap: {

    marginBottom: 40
  },

  subTitle: {

    color: '#00d4ff',

    letterSpacing: 4,

    marginBottom: 14,

    fontSize: 13
  },

  title: {

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
  },

  tabsWrap: {

    display: 'flex',

    flexWrap: 'wrap',

    gap: 16,

    marginBottom: 40
  },

  tabBtn: {

    display: 'flex',

    alignItems: 'center',

    gap: 10,

    padding:
      '15px 24px',

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

    position: 'relative',

    zIndex: 20
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

    gap: 10,

    padding:
      '15px 24px',

    borderRadius: 18,

    border:
      '1px solid rgba(255,0,80,0.25)',

    background:
      'rgba(255,0,80,0.08)',

    color: '#ff4d7a',

    cursor: 'pointer',

    fontSize: 15
  },

  panelWrap: {

    position: 'relative',

    zIndex: 10
  }
};