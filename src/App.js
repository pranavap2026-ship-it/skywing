import React, {
  useEffect,
  useRef
} from 'react';

import {
  BrowserRouter,
  Routes,
  Route,
  Navigate
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
import EventAccessGate from './components/EventAccessGate';

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
// 🔐 ADMIN PROTECTED ROUTE
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

        <div style={loaderCircle} />

        <h2 style={loadingText}>
          LOADING...
        </h2>

      </div>
    );
  }

  // ===============================
  // ❌ NOT LOGGED IN
  // ===============================
  if (!user) {

    return (
      <Navigate
        to="/login"
        replace
      />
    );
  }

  // ===============================
  // ✅ ACCESS GRANTED
  // ===============================
  return children;
};

// ===============================
// 🚀 MAIN APP
// ===============================
function App() {

  const cursorRef =
    useRef(null);

  const ringRef =
    useRef(null);

  const rafRef =
    useRef(null);

  // ===============================
  // 🖱️ CURSOR EFFECT
  // ===============================
  useEffect(() => {

    const cursor =
      cursorRef.current;

    const ring =
      ringRef.current;

    if (
      !cursor ||
      !ring
    ) return;

    let mx =
      window.innerWidth / 2;

    let my =
      window.innerHeight / 2;

    let rx = mx;
    let ry = my;

    const onMove = (e) => {

      mx = e.clientX;
      my = e.clientY;
    };

    document.addEventListener(
      'mousemove',
      onMove
    );

    const animate = () => {

      // INNER DOT
      cursor.style.transform =
        `translate(${mx}px, ${my}px)`;

      // OUTER RING
      rx +=
        (mx - rx) * 0.12;

      ry +=
        (my - ry) * 0.12;

      ring.style.transform =
        `translate(${rx}px, ${ry}px)`;

      rafRef.current =
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

      cancelAnimationFrame(
        rafRef.current
      );
    };

  }, []);

  // ===============================
  // 🌐 APP
  // ===============================
  return (

    <AuthProvider>

      <BrowserRouter>

        {/* CURSOR */}
        <div
          ref={cursorRef}
          className="cursor"
        />

        <div
          ref={ringRef}
          className="cursor-ring"
        />

        {/* FX */}
        <div className="scanlines" />

        {/* BACKGROUND */}
        <Background3D />

        {/* TOAST */}
        <Toast />

        {/* NAVBAR */}
        <Navbar />

        {/* ROUTES */}
        <Routes>

          {/* HOME */}
          <Route
            path="/"
            element={<Home />}
          />

          {/* EVENTS LOCK */}
          <Route
            path="/events"
            element={

              <EventAccessGate>

                <Events />

              </EventAccessGate>
            }
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

          {/* LOGIN */}
          <Route
            path="/login"
            element={<Login />}
          />

          {/* ADMIN */}
          <Route
            path="/admin"
            element={

              <ProtectedRoute>

                <AdminDashboard />

              </ProtectedRoute>
            }
          />

          {/* FALLBACK */}
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

        {/* FOOTER */}
        <Footer />

      </BrowserRouter>

    </AuthProvider>
  );
}

// ===============================
// 🎨 LOADING STYLE
// ===============================
const loadingStyle = {

  height: '100vh',

  display: 'flex',

  flexDirection: 'column',

  justifyContent:
    'center',

  alignItems: 'center',

  gap: 24,

  background:
    '#050816'
};

const loaderCircle = {

  width: 70,

  height: 70,

  borderRadius: '50%',

  border:
    '4px solid rgba(255,255,255,0.08)',

  borderTop:
    '4px solid #00aaff',

  animation:
    'spin 1s linear infinite'
};

const loadingText = {

  color: '#00aaff',

  letterSpacing: 5,

  fontFamily:
    'Orbitron,sans-serif'
};

export default App;