import React, { useEffect, useRef } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import './index.css';

import Navbar from './components/Navbar';
import Background3D from './components/Background3D';
import Toast from './components/Toast';

import Home from './pages/Home';
import Events from './pages/Events';
import Team from './pages/Team';
import Social from './pages/Social';
import Login from './pages/Login';
import AdminDashboard from './pages/AdminDashboard';
import Footer from './components/Footer';
// ===============================
// 🔐 PROTECTED ROUTE (FIXED)
// ===============================
const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div style={{
        display:'flex',
        alignItems:'center',
        justifyContent:'center',
        height:'100vh',
        fontFamily:'Orbitron',
        color:'#00aaff',
        letterSpacing:4
      }}>
        LOADING...
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

function App() {
  const cursorRef = useRef(null);
  const ringRef = useRef(null);
  let rx = 0, ry = 0;

  useEffect(() => {
    const cursor = cursorRef.current;
    const ring = ringRef.current;
    let mx = 0, my = 0;

    const onMove = e => {
      mx = e.clientX;
      my = e.clientY;
    };

    document.addEventListener('mousemove', onMove);

    const anim = () => {
      if (cursor) {
        cursor.style.left = mx + 'px';
        cursor.style.top = my + 'px';
      }

      rx += (mx - rx) * 0.12;
      ry += (my - ry) * 0.12;

      if (ring) {
        ring.style.left = rx + 'px';
        ring.style.top = ry + 'px';
      }

      requestAnimationFrame(anim);
    };

    anim();

    return () => document.removeEventListener('mousemove', onMove);
  }, []);

  return (
    <AuthProvider>
      <BrowserRouter>

        <div ref={cursorRef} className="cursor" />
        <div ref={ringRef} className="cursor-ring" />
        <div className="scanlines" />

        <Background3D />
        <Toast />
        <Navbar />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/events" element={<Events />} />
          <Route path="/team" element={<Team />} />
          <Route path="/social" element={<Social />} />
          <Route path="/login" element={<Login />} />

          {/* 🔐 ADMIN ROUTE */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />

          <Route path="*" element={<Navigate to="/" replace />} />
          
        </Routes>
<Footer />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;