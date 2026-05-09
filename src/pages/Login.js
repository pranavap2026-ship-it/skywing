import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { showToast } from '../components/Toast';

export default function Login() {
  const [form, setForm] = useState({ username: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  // ===============================
  // 🔐 HANDLE LOGIN
  // ===============================
  const handleSubmit = async () => {
    if (loading) return;

    const username = form.username.trim();

    if (!username || !form.password) {
      return showToast('Please fill all fields', 'error');
    }

    setLoading(true);

    try {
      await login(username, form.password);

      showToast('Welcome back, Admin 👑', 'success');

      // ✅ navigate only after login
      navigate('/admin', { replace: true });

    } catch (err) {
      console.error(err);

      showToast(
        err?.response?.data?.message || 'Invalid credentials',
        'error'
      );
    } finally {
      setLoading(false);
    }
  };

  // ===============================
  // ⌨️ ENTER KEY SUPPORT
  // ===============================
  const handleKey = (e) => {
    if (e.key === 'Enter') handleSubmit();
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20
      }}
    >
      <div className="card" style={{ width: '100%', maxWidth: 420, padding: 44 }}>

        {/* TITLE */}
        <p style={{ textAlign: 'center', marginBottom: 8 }}>
          // secure access
        </p>

        <h2
          style={{
            textAlign: 'center',
            marginBottom: 36
          }}
        >
          ADMIN LOGIN
        </h2>

        {/* USERNAME */}
        <div className="form-group">
          <label>Username</label>
          <input
            className="form-input"
            placeholder="admin"
            value={form.username}
            disabled={loading}
            onChange={(e) =>
              setForm({ ...form, username: e.target.value })
            }
            onKeyDown={handleKey}
          />
        </div>

        {/* PASSWORD */}
        <div className="form-group">
          <label>Password</label>

          <div style={{ position: 'relative' }}>
            <input
              className="form-input"
              type={showPass ? 'text' : 'password'}
              placeholder="••••••••"
              value={form.password}
              disabled={loading}
              onChange={(e) =>
                setForm({ ...form, password: e.target.value })
              }
              onKeyDown={handleKey}
            />

            <span
              onClick={() => setShowPass(!showPass)}
              style={{
                position: 'absolute',
                right: 10,
                top: '50%',
                transform: 'translateY(-50%)',
                cursor: 'pointer'
              }}
            >
              {showPass ? '🙈' : '👁'}
            </span>
          </div>
        </div>

        {/* BUTTON */}
        <button
          className="btn btn-primary"
          style={{ width: '100%', marginTop: 12 }}
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? 'AUTHENTICATING...' : 'LOGIN'}
        </button>

        {/* FOOTER */}
        <p style={{ textAlign: 'center', marginTop: 20, fontSize: 12 }}>
          SKYWING ADMIN ACCESS ONLY
        </p>
      </div>
    </div>
  );
}