import React, { createContext, useContext, useState, useEffect } from 'react';
import { authAPI } from '../api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // ===============================
  // 🔁 LOAD USER FROM STORAGE
  // ===============================
  useEffect(() => {
    const stored = localStorage.getItem('user');

    if (stored) {
      try {
        setUser(JSON.parse(stored));
      } catch {
        localStorage.removeItem('user');
      }
    }

    setLoading(false);
  }, []);

  // ===============================
  // 🔐 LOGIN
  // ===============================
  const login = async (username, password) => {
    const res = await authAPI.login({ username, password });

    const userData = res.data.user;

    localStorage.setItem('user', JSON.stringify(userData));
    localStorage.setItem('token', res.data.token);

    setUser(userData);
  };

  // ===============================
  // 🚪 LOGOUT
  // ===============================
  const logout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

// ===============================
// 🔗 CUSTOM HOOK
// ===============================
export const useAuth = () => useContext(AuthContext);