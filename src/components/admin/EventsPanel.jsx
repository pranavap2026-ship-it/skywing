import React, { useState, useEffect, useCallback } from 'react';
import { eventsAPI } from '../../api';
import { showToast } from '../Toast';

const extractData = (res) =>
  Array.isArray(res.data) ? res.data : res.data?.data || [];

// ===============================
// 🎨 CATEGORY ICONS
// ===============================
const CATEGORY_ICONS = {
  arts: '🎨',
  sports: '⚽',
  cultural: '🎭',
  tech: '💡',
  freshers: '🎓',
  farewell: '✨',
  other: '📸'
};

export default function EventsPanel() {
  const [events, setEvents] = useState([]);
  const [modal, setModal] = useState(false);
  const [editing, setEditing] = useState(null);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    title: '',
    description: '',
    driveLink: '',
    category: 'other',
    icon: '📸',
    coverColor: '#00aaff'
  });

  // ===============================
  // 🔄 LOAD EVENTS
  // ===============================
  const load = useCallback(async () => {
    try {
      const res = await eventsAPI.getAll();
      setEvents(extractData(res));
    } catch (err) {
      console.error(err);
      setEvents([]);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  // ===============================
  // 💾 SAVE EVENT
  // ===============================
  const save = async () => {
    // ✅ FIXED VALIDATION
    if (
      !form.title.trim() ||
      !form.description.trim() ||
      !form.driveLink.trim()
    ) {
      return showToast('All fields required', 'error');
    }

    setLoading(true);

    try {
      const payload = {
        title: form.title.trim(),
        description: form.description.trim(),
        driveLink: form.driveLink.trim().replace(/\s/g, ''),
        category: form.category,
        icon: form.icon,
        coverColor: form.coverColor
      };

      if (editing) {
        await eventsAPI.update(editing, payload);

        showToast('Event updated ✅');
      } else {
        await eventsAPI.create(payload);

        showToast('Event created 🚀');
      }

      // RESET
      setModal(false);

      setEditing(null);

      setForm({
        title: '',
        description: '',
        driveLink: '',
        category: 'other',
        icon: '📸',
        coverColor: '#00aaff'
      });

      load();

    } catch (err) {
      console.error(err);

      showToast(
        err?.response?.data?.message ||
          'Failed to save event',
        'error'
      );
    } finally {
      setLoading(false);
    }
  };

  // ===============================
  // ✏️ EDIT EVENT
  // ===============================
  const handleEdit = (ev) => {
    setEditing(ev._id);

    setForm({
      title: ev.title || '',
      description: ev.description || '',
      driveLink: ev.driveLink || '',
      category: ev.category || 'other',
      icon: ev.icon || '📸',
      coverColor: ev.coverColor || '#00aaff'
    });

    setModal(true);
  };

  // ===============================
  // ❌ DELETE EVENT
  // ===============================
  const handleDelete = async (id) => {
    if (!window.confirm('Delete this event?'))
      return;

    try {
      await eventsAPI.delete(id);

      showToast('Deleted 🗑️');

      load();

    } catch (err) {
      console.error(err);

      showToast('Delete failed', 'error');
    }
  };

  return (
    <div>
      {/* HEADER */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 25
        }}
      >
        <div>
          <h2 className="section-title">
            EVENTS MANAGER
          </h2>

          <p className="section-label">
            // manage all skywing events
          </p>
        </div>

        <button
          className="btn btn-primary"
          onClick={() => setModal(true)}
        >
          + Add Event
        </button>
      </div>

      {/* STATS */}
      <div className="stats-row">
        <div className="stat">
          <h2>{events.length}</h2>
          <p>Total Events</p>
        </div>

        <div className="stat">
          <h2>
            {
              events.filter(
                e => e.category === 'arts'
              ).length
            }
          </h2>
          <p>Arts Events</p>
        </div>

        <div className="stat">
          <h2>
            {
              events.filter(
                e => e.category === 'sports'
              ).length
            }
          </h2>
          <p>Sports Events</p>
        </div>
      </div>

      {/* EVENTS GRID */}
      <div
        className="grid-2"
        style={{ marginTop: 25 }}
      >
        {events.length === 0 ? (
          <div className="card">
            <p style={{ color: 'var(--gray)' }}>
              No events found
            </p>
          </div>
        ) : (
          events.map((ev) => (
            <div
              key={ev._id}
              className="card"
              style={{
                borderTop: `3px solid ${
                  ev.coverColor || '#00aaff'
                }`
              }}
            >
              {/* ICON */}
              <div
                style={{
                  fontSize: 38,
                  marginBottom: 15
                }}
              >
                {ev.icon ||
                  CATEGORY_ICONS[ev.category] ||
                  '📸'}
              </div>

              {/* TITLE */}
              <h3
                style={{
                  marginBottom: 10
                }}
              >
                {ev.title}
              </h3>

              {/* DESC */}
              <p
                style={{
                  color: 'var(--gray)',
                  lineHeight: 1.7,
                  marginBottom: 18
                }}
              >
                {ev.description}
              </p>

              {/* CATEGORY */}
              <div
                style={{
                  marginBottom: 15,
                  fontSize: 12,
                  letterSpacing: 2,
                  color: 'var(--blue)'
                }}
              >
                {ev.category?.toUpperCase()}
              </div>

              {/* DRIVE */}
              <a
                href={ev.driveLink}
                target="_blank"
                rel="noreferrer"
                className="btn btn-secondary"
                style={{
                  width: '100%',
                  justifyContent: 'center'
                }}
              >
                📁 Open Drive
              </a>

              {/* ACTIONS */}
              <div
                style={{
                  marginTop: 15,
                  display: 'flex',
                  gap: 10
                }}
              >
                <button
                  className="btn btn-secondary btn-sm"
                  onClick={() => handleEdit(ev)}
                >
                  Edit
                </button>

                <button
                  className="btn btn-danger btn-sm"
                  onClick={() =>
                    handleDelete(ev._id)
                  }
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
                ? 'Edit Event'
                : 'Add Event'}
            </h3>

            {/* TITLE */}
            <div className="form-group">
              <label className="form-label">
                Event Title
              </label>

              <input
                className="form-input"
                value={form.title}
                onChange={(e) =>
                  setForm({
                    ...form,
                    title: e.target.value
                  })
                }
              />
            </div>

            {/* DESCRIPTION */}
            <div className="form-group">
              <label className="form-label">
                Description
              </label>

              <textarea
                className="form-input"
                rows={5}
                value={form.description}
                onChange={(e) =>
                  setForm({
                    ...form,
                    description:
                      e.target.value
                  })
                }
              />
            </div>

            {/* DRIVE */}
            <div className="form-group">
              <label className="form-label">
                Google Drive Link
              </label>

              <input
                className="form-input"
                value={form.driveLink}
                onChange={(e) =>
                  setForm({
                    ...form,
                    driveLink:
                      e.target.value
                  })
                }
              />
            </div>

            {/* CATEGORY */}
            <div className="form-group">
              <label className="form-label">
                Category
              </label>

              <select
                className="form-input"
                value={form.category}
                onChange={(e) =>
                  setForm({
                    ...form,
                    category:
                      e.target.value,
                    icon:
                      CATEGORY_ICONS[
                        e.target.value
                      ]
                  })
                }
              >
                <option value="arts">
                  Arts
                </option>

                <option value="sports">
                  Sports
                </option>

                <option value="cultural">
                  Cultural
                </option>

                <option value="tech">
                  Tech
                </option>

                <option value="freshers">
                  Freshers
                </option>

                <option value="farewell">
                  Farewell
                </option>

                <option value="other">
                  Other
                </option>
              </select>
            </div>

            {/* COLOR */}
            <div className="form-group">
              <label className="form-label">
                Theme Color
              </label>

              <input
                type="color"
                className="form-input"
                value={form.coverColor}
                onChange={(e) =>
                  setForm({
                    ...form,
                    coverColor:
                      e.target.value
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
                {loading
                  ? 'Saving...'
                  : editing
                  ? 'Update Event'
                  : 'Save Event'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}