import React, {
  useState
} from 'react';

import {
  FaCalendarAlt,
  FaUsers,
  FaGlobe,
  FaSignOutAlt
} from 'react-icons/fa';

import { useAuth }
  from '../context/AuthContext';

import EventsPanel
  from '../components/admin/EventsPanel';

import MembersPanel
  from '../components/admin/MembersPanel';

import SocialPanel
  from '../components/admin/SocialPanel';

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

      {/* TITLE */}
      <div style={styles.header}>

        <h2 style={styles.title}>
          ADMIN DASHBOARD
        </h2>

        <p style={styles.sub}>
          // control center
        </p>

      </div>

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

          style={styles.logoutBtn}

          onClick={logout}
        >

          <FaSignOutAlt />

          Logout

        </button>

      </div>

      {/* CONTENT */}
      <div style={styles.panelWrap}>

        {tab === 'events' &&
          <EventsPanel />}

        {tab === 'members' &&
          <MembersPanel />}

        {tab === 'social' &&
          <SocialPanel />}

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
        ? '100px 14px 70px'
        : '120px 40px 80px'
  },

  // ===============================
  // HEADER
  // ===============================
  header: {

    marginBottom:
      isMobile
        ? 25
        : 35
  },

  title: {

    color: '#fff',

    fontSize:
      isMobile
        ? '2rem'
        : '3.5rem',

    letterSpacing:
      isMobile
        ? 2
        : 5,

    lineHeight: 1,

    fontFamily:
      'Orbitron,sans-serif',

    background:
      'linear-gradient(135deg,#fff,#00aaff)',

    WebkitBackgroundClip:
      'text',

    WebkitTextFillColor:
      'transparent'
  },

  sub: {

    color: '#00aaff',

    marginTop: 10,

    letterSpacing: 3,

    fontSize: 12
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

    gap: 14,

    justifyContent:
      'space-between',

    marginBottom: 30
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
      'blur(12px)',

    fontSize:
      isMobile
        ? 15
        : 14,

    transition:
      '0.3s ease'
  },

  activeTab: {

    background:
      'linear-gradient(135deg,#00aaff,#0066ff)',

    boxShadow:
      '0 0 22px rgba(0,170,255,0.35)'
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

    fontSize:
      isMobile
        ? 15
        : 14
  },

  // ===============================
  // CONTENT
  // ===============================
  panelWrap: {

    width: '100%'
  }
};