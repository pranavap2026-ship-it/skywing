import React, {
  useEffect,
  useRef
} from 'react';

import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation
} from 'react-router-dom';

import {
  AuthProvider,
  useAuth
} from './context/AuthContext';

import './index.css';

// ===============================
// 🧩 COMPONENTS
// ===============================
import Navbar from './components/Navbar';

import Background3D from './components/Background3D';

import Toast from './components/Toast';

import Footer from './components/Footer';

// ===============================
// 📄 PAGES
// ===============================
import Home from './pages/Home';

import Events from './pages/Events';

import Team from './pages/Team';

import Social from './pages/Social';

import Login from './pages/Login';

import AdminDashboard from './pages/AdminDashboard';

// ===============================
// 🔐 PROTECTED ROUTE
// ===============================
const ProtectedRoute = ({
  children
}) => {

  const {
    user,
    loading
  } = useAuth();

  // ===============================
  // ⏳ LOADING
  // ===============================
  if (loading) {

    return (

      <div style={loadingStyle}>
        LOADING...
      </div>
    );
  }

  // ===============================
  // 🚫 NOT LOGGED IN
  // ===============================
  if (!user) {

    return (
      <Navigate
        to="/skywing-admin"
        replace
      />
    );
  }

  return children;
};

// ===============================
// 🧠 MAIN APP CONTENT
// ===============================
function AppContent() {

  const cursorRef =
    useRef(null);

  const ringRef =
    useRef(null);

  const location =
    useLocation();

  // ===============================
  // 🖱 CUSTOM CURSOR
  // ===============================
  useEffect(() => {

    const cursor =
      cursorRef.current;

    const ring =
      ringRef.current;

    let mx = 0;
    let my = 0;

    let rx = 0;
    let ry = 0;

    const onMove = (e) => {

      mx = e.clientX;

      my = e.clientY;
    };

    document.addEventListener(
      'mousemove',
      onMove
    );

    const animate = () => {

      // ===============================
      // DOT CURSOR
      // ===============================
      if (cursor) {

        cursor.style.left =
          `${mx}px`;

        cursor.style.top =
          `${my}px`;
      }

      // ===============================
      // RING CURSOR
      // ===============================
      rx +=
        (mx - rx) * 0.12;

      ry +=
        (my - ry) * 0.12;

      if (ring) {

        ring.style.left =
          `${rx}px`;

        ring.style.top =
          `${ry}px`;
      }

      requestAnimationFrame(
        animate
      );
    };

    animate();

    return () => {

      document.removeEventListener(
        'mousemove',
        onMove
      );
    };

  }, []);

  // ===============================
  // 🚫 HIDE FOOTER
  // ===============================
  const hideFooter =
    location.pathname ===
      '/admin' ||

    location.pathname ===
      '/skywing-admin';

  return (

    <>
      {/* ===============================
          🖱 CURSORS
      =============================== */}
      <div
        ref={cursorRef}
        className="cursor"
      />

      <div
        ref={ringRef}
        className="cursor-ring"
      />

      <div className="scanlines" />

      {/* ===============================
          🌌 BACKGROUND
      =============================== */}
      <Background3D />

      {/* ===============================
          🔔 TOAST
      =============================== */}
      <Toast />

      {/* ===============================
          🚀 NAVBAR
      =============================== */}
      <Navbar />

      {/* ===============================
          📄 ROUTES
      =============================== */}
      <Routes>

        {/* HOME */}
        <Route
          path="/"
          element={<Home />}
        />

        {/* EVENTS */}
        <Route
          path="/events"
          element={<Events />}
        />

        {/* TEAM */}
        <Route
          path="/team"
          element={<Team />}
        />

        {/* SOCIAL */}
        <Route
          path="/social"
          element={<Social />}
        />

        {/* 🔐 HIDDEN ADMIN LOGIN */}
        <Route
          path="/skywing-admin"
          element={<Login />}
        />

        {/* 👑 ADMIN DASHBOARD */}
        <Route
          path="/admin"

          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        {/* ❌ FALLBACK */}
        <Route
          path="*"
          element={
            <Navigate
              to="/"
              replace
            />
          }
        />

      </Routes>

      {/* ===============================
          🦶 FOOTER
      =============================== */}
      {!hideFooter &&
        <Footer />
      }
    </>
  );
}

// ===============================
// 🚀 ROOT APP
// ===============================
function App() {

  return (

    <AuthProvider>

      <BrowserRouter>

        <AppContent />

      </BrowserRouter>

    </AuthProvider>
  );
}

export default App;

// ===============================
// 🎨 STYLES
// ===============================
const loadingStyle = {

  display: 'flex',

  alignItems: 'center',

  justifyContent: 'center',

  height: '100vh',

  fontFamily:
    'Orbitron,sans-serif',

  color: '#00aaff',

  letterSpacing: 4,

  fontSize: 14
};