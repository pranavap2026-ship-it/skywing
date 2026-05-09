import React, { useState, useEffect, useCallback } from 'react';
import {
  FaInstagram,
  FaWhatsapp,
  FaLinkedin,
  FaFacebook,
  FaYoutube,
  FaGlobe,
  FaTelegram,
  FaGithub
} from 'react-icons/fa';

import { socialAPI } from '../../api';
import { showToast } from '../Toast';

// ===============================
// 📦 EXTRACT API DATA
// ===============================
const extractData = (res) =>
  Array.isArray(res.data) ? res.data : res.data?.data || [];

// ===============================
// 🎨 ICON OPTIONS
// ===============================
const ICON_OPTIONS = [
  { name: 'Website', value: 'website', icon: <FaGlobe /> },
  { name: 'Instagram', value: 'instagram', icon: <FaInstagram /> },
  { name: 'WhatsApp', value: 'whatsapp', icon: <FaWhatsapp /> },
  { name: 'LinkedIn', value: 'linkedin', icon: <FaLinkedin /> },
  { name: 'Facebook', value: 'facebook', icon: <FaFacebook /> },
  { name: 'YouTube', value: 'youtube', icon: <FaYoutube /> },
  { name: 'Telegram', value: 'telegram', icon: <FaTelegram /> },
  { name: 'GitHub', value: 'github', icon: <FaGithub /> }
];

// ===============================
// 🎯 RENDER ICON
// ===============================
const renderIcon = (icon) => {
  switch (icon) {
    case 'instagram':
      return <FaInstagram />;

    case 'whatsapp':
      return <FaWhatsapp />;

    case 'linkedin':
      return <FaLinkedin />;

    case 'facebook':
      return <FaFacebook />;

    case 'youtube':
      return <FaYoutube />;

    case 'telegram':
      return <FaTelegram />;

    case 'github':
      return <FaGithub />;

    default:
      return <FaGlobe />;
  }
};

export default function SocialPanel() {
  const [links, setLinks] = useState([]);
  const [modal, setModal] = useState(false);
  const [editing, setEditing] = useState(null);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    platform: '',
    url: '',
    handle: '',
    icon: 'website',
    color: '#00aaff'
  });

  // ===============================
  // 🔄 LOAD LINKS
  // ===============================
  const load = useCallback(async () => {
    try {
      const res = await socialAPI.getAll();
      setLinks(extractData(res));
    } catch (err) {
      console.error(err);
      setLinks([]);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  // ===============================
  // 💾 SAVE LINK
  // ===============================
  const save = async () => {
    if (!form.platform || !form.url) {
      return showToast('Platform & URL required', 'error');
    }

    setLoading(true);

    try {
      if (editing) {
        await socialAPI.update(editing, form);
        showToast('Updated ✅');
      } else {
        await socialAPI.create(form);
        showToast('Added 🚀');
      }

      setModal(false);
      setEditing(null);

      setForm({
        platform: '',
        url: '',
        handle: '',
        icon: 'website',
        color: '#00aaff'
      });

      load();
    } catch (err) {
      console.error(err);
      showToast('Failed', 'error');
    } finally {
      setLoading(false);
    }
  };

  // ===============================
  // ✏️ EDIT
  // ===============================
  const handleEdit = (s) => {
    setEditing(s._id);

    setForm({
      platform: s.platform || '',
      url: s.url || '',
      handle: s.handle || '',
      icon: s.icon || 'website',
      color: s.color || '#00aaff'
    });

    setModal(true);
  };

  // ===============================
  // ❌ DELETE
  // ===============================
  const handleDelete = async (id) => {
    if (!window.confirm('Delete this link?')) return;

    try {
      await socialAPI.delete(id);

      showToast('Deleted 🗑️');

      load();
    } catch (err) {
      console.error(err);
      showToast('Delete failed', 'error');
    }
  };

  return (
    <div>
      {/* ADD BUTTON */}
      <button
        className="btn btn-primary"
        onClick={() => setModal(true)}
      >
        + Add Link
      </button>

      {/* GRID */}
      <div className="grid-2" style={{ marginTop: 20 }}>
        {links.length === 0 ? (
          <p style={{ color: 'var(--gray)' }}>
            No links found
          </p>
        ) : (
          links.map((s) => (
            <div
              key={s._id}
              className="card"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 15
              }}
            >
              {/* ICON */}
              <div
                style={{
                  width: 50,
                  height: 50,
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 20,
                  background: `${s.color}20`,
                  border: `1px solid ${s.color}`,
                  color: s.color,
                  flexShrink: 0
                }}
              >
                {renderIcon(s.icon)}
              </div>

              {/* INFO */}
              <div style={{ flex: 1 }}>
                <h4>{s.platform}</h4>

                <a
                  href={s.url}
                  target="_blank"
                  rel="noreferrer"
                  style={{
                    color: 'var(--gray)',
                    fontSize: 13
                  }}
                >
                  {s.handle || s.url}
                </a>
              </div>

              {/* ACTIONS */}
              <div style={{ display: 'flex', gap: 8 }}>
                <button
                  className="btn btn-secondary btn-sm"
                  onClick={() => handleEdit(s)}
                >
                  Edit
                </button>

                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleDelete(s._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* MODAL */}
      {modal && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>
              {editing
                ? 'Edit Social Link'
                : 'Add Social Link'}
            </h3>

            {/* PLATFORM */}
            <div className="form-group">
              <label className="form-label">
                Platform
              </label>

              <input
                className="form-input"
                value={form.platform}
                onChange={(e) =>
                  setForm({
                    ...form,
                    platform: e.target.value
                  })
                }
              />
            </div>

            {/* URL */}
            <div className="form-group">
              <label className="form-label">
                URL
              </label>

              <input
                className="form-input"
                value={form.url}
                onChange={(e) =>
                  setForm({
                    ...form,
                    url: e.target.value
                  })
                }
              />
            </div>

            {/* HANDLE */}
            <div className="form-group">
              <label className="form-label">
                Handle
              </label>

              <input
                className="form-input"
                value={form.handle}
                onChange={(e) =>
                  setForm({
                    ...form,
                    handle: e.target.value
                  })
                }
              />
            </div>

            {/* ICON SELECTOR */}
            <div className="form-group">
              <label className="form-label">
                Platform Icon
              </label>

              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(4,1fr)',
                  gap: 10,
                  marginTop: 10
                }}
              >
                {ICON_OPTIONS.map((item) => (
                  <button
                    key={item.value}
                    type="button"
                    onClick={() =>
                      setForm({
                        ...form,
                        icon: item.value,
                        platform: item.name
                      })
                    }
                    style={{
                      border:
                        form.icon === item.value
                          ? '2px solid var(--blue)'
                          : '1px solid var(--border)',

                      background:
                        'rgba(0,170,255,0.08)',

                      padding: 14,
                      borderRadius: 12,
                      cursor: 'pointer',
                      color: '#fff',
                      fontSize: 22,
                      transition: '0.3s'
                    }}
                  >
                    {item.icon}
                  </button>
                ))}
              </div>
            </div>

            {/* COLOR */}
            <div className="form-group">
              <label className="form-label">
                Theme Color
              </label>

              <input
                type="color"
                className="form-input"
                value={form.color}
                onChange={(e) =>
                  setForm({
                    ...form,
                    color: e.target.value
                  })
                }
              />
            </div>

            {/* ACTIONS */}
            <div className="modal-actions">
              <button
                className="btn btn-secondary"
                onClick={() => {
                  setModal(false);
                  setEditing(null);
                }}
              >
                Cancel
              </button>

              <button
                className="btn btn-primary"
                onClick={save}
                disabled={loading}
              >
                {loading ? 'Saving...' : 'Save'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}