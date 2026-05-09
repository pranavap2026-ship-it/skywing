import axios from 'axios';

// ===============================
// 🌐 BASE API URL
// ===============================
const API = axios.create({

  baseURL:
    process.env.REACT_APP_API_URL ||

    'https://skywing-mediateam.onrender.com/api',

  headers: {
    'Content-Type':
      'application/json'
  }
});

// ===============================
// 🔐 AUTO ATTACH TOKEN
// ===============================
API.interceptors.request.use(

  (config) => {

    const token =
      localStorage.getItem(
        'skywing_token'
      );

    if (token) {

      config.headers.Authorization =
        `Bearer ${token}`;
    }

    return config;
  },

  (error) =>
    Promise.reject(error)
);

// ===============================
// 🚨 GLOBAL ERROR HANDLER
// ===============================
API.interceptors.response.use(

  (response) => response,

  (error) => {

    // ===============================
    // 🔒 TOKEN EXPIRED
    // ===============================
    if (
      error.response?.status === 401
    ) {

      localStorage.removeItem(
        'skywing_token'
      );

      // ✅ hidden admin login
      if (
        window.location.pathname !==
        '/skywing-admin'
      ) {

        window.location.href =
          '/skywing-admin';
      }
    }

    return Promise.reject(error);
  }
);

// ===============================
// 🔑 AUTH API
// ===============================
export const authAPI = {

  login: (data) =>
    API.post(
      '/auth/login',
      data
    ),

  register: (data) =>
    API.post(
      '/auth/register',
      data
    ),

  me: () =>
    API.get('/auth/me')
};

// ===============================
// 🎉 EVENTS API
// ===============================
export const eventsAPI = {

  getAll: () =>
    API.get('/events'),

  getById: (id) =>
    API.get(
      `/events/${id}`
    ),

  create: (data) =>
    API.post(
      '/events',
      data
    ),

  update: (
    id,
    data
  ) =>
    API.put(
      `/events/${id}`,
      data
    ),

  delete: (id) =>
    API.delete(
      `/events/${id}`
    )
};

// ===============================
// 👥 MEMBERS API
// ===============================
export const membersAPI = {

  getAll: () =>
    API.get('/members'),

  getById: (id) =>
    API.get(
      `/members/${id}`
    ),

  // ===============================
  // ➕ CREATE MEMBER
  // ===============================
  create: (data) =>
    API.post(
      '/members',
      data,
      {
        headers: {
          'Content-Type':
            'multipart/form-data'
        }
      }
    ),

  // ===============================
  // ✏️ UPDATE MEMBER
  // ===============================
  update: (
    id,
    data
  ) =>
    API.put(
      `/members/${id}`,
      data,
      {
        headers: {
          'Content-Type':
            'multipart/form-data'
        }
      }
    ),

  // ===============================
  // ❌ DELETE MEMBER
  // ===============================
  delete: (id) =>
    API.delete(
      `/members/${id}`
    )
};

// ===============================
// 🌍 SOCIAL API
// ===============================
export const socialAPI = {

  getAll: () =>
    API.get('/social'),

  getById: (id) =>
    API.get(
      `/social/${id}`
    ),

  create: (data) =>
    API.post(
      '/social',
      data
    ),

  update: (
    id,
    data
  ) =>
    API.put(
      `/social/${id}`,
      data
    ),

  delete: (id) =>
    API.delete(
      `/social/${id}`
    )
};

// ===============================
// 🚀 DEFAULT EXPORT
// ===============================
export default API;