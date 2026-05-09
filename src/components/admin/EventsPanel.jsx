import React, {
  useState,
  useEffect,
  useCallback
} from 'react';

import {
  FaEdit,
  FaTrash,
  FaPlus,
  FaFolderOpen,
  FaPaintBrush,
  FaFutbol,
  FaTheaterMasks,
  FaMicrochip,
  FaGraduationCap,
  FaStar,
  FaCamera
} from 'react-icons/fa';

import { eventsAPI } from '../../api';
import { showToast } from '../Toast';

// ===============================
// 📱 MOBILE
// ===============================
const isMobile =
  window.innerWidth <= 768;

// ===============================
// 🎯 CATEGORY ICONS
// ===============================
const CATEGORY_ICONS = {

  arts: <FaPaintBrush />,

  sports: <FaFutbol />,

  cultural:
    <FaTheaterMasks />,

  tech: <FaMicrochip />,

  freshers:
    <FaGraduationCap />,

  farewell: <FaStar />,

  other: <FaCamera />
};

// ===============================
// 🔧 SAFE DATA
// ===============================
const extractData = (res) =>
  Array.isArray(res.data)
    ? res.data
    : res.data?.data || [];

// ===============================
// 🚀 COMPONENT
// ===============================
export default function EventsPanel() {

  const [events, setEvents] =
    useState([]);

  const [modal, setModal] =
    useState(false);

  const [editing, setEditing] =
    useState(null);

  const [loading, setLoading] =
    useState(false);

  const [form, setForm] =
    useState({

      title: '',

      description: '',

      driveLink: '',

      category: 'other',

      coverColor: '#00aaff'
    });

  // ===============================
  // 📡 LOAD EVENTS
  // ===============================
  const loadEvents =
    useCallback(async () => {

      try {

        const res =
          await eventsAPI.getAll();

        setEvents(
          extractData(res)
        );

      } catch (err) {

        console.error(err);

        setEvents([]);
      }

    }, []);

  useEffect(() => {

    loadEvents();

  }, [loadEvents]);

  // ===============================
  // ➕ OPEN ADD
  // ===============================
  const openAdd = () => {

    setEditing(null);

    setForm({

      title: '',

      description: '',

      driveLink: '',

      category: 'other',

      coverColor: '#00aaff'
    });

    setModal(true);
  };

  // ===============================
  // ✏️ EDIT
  // ===============================
  const handleEdit = (ev) => {

    setEditing(ev._id);

    setForm({

      title:
        ev.title || '',

      description:
        ev.description || '',

      driveLink:
        ev.driveLink || '',

      category:
        ev.category || 'other',

      coverColor:
        ev.coverColor ||
        '#00aaff'
    });

    setModal(true);
  };

  // ===============================
  // ❌ DELETE
  // ===============================
  const handleDelete =
    async (id) => {

      if (
        !window.confirm(
          'Delete this event?'
        )
      ) return;

      try {

        await eventsAPI.delete(id);

        showToast(
          'Event deleted'
        );

        loadEvents();

      } catch (err) {

        console.error(err);

        showToast(
          'Delete failed',
          'error'
        );
      }
    };

  // ===============================
  // 💾 SAVE
  // ===============================
  const saveEvent =
    async () => {

      if (
        !form.title.trim() ||
        !form.description.trim() ||
        !form.driveLink.trim()
      ) {

        return showToast(
          'Fill all fields',
          'error'
        );
      }

      setLoading(true);

      try {

        const payload = {

          title:
            form.title.trim(),

          description:
            form.description.trim(),

          driveLink:
            form.driveLink.trim(),

          category:
            form.category,

          coverColor:
            form.coverColor
        };

        if (editing) {

          await eventsAPI.update(
            editing,
            payload
          );

          showToast(
            'Event updated'
          );

        } else {

          await eventsAPI.create(
            payload
          );

          showToast(
            'Event created'
          );
        }

        setModal(false);

        loadEvents();

      } catch (err) {

        console.error(err);

        showToast(
          'Save failed',
          'error'
        );

      } finally {

        setLoading(false);
      }
    };

  return (

    <div>

      {/* HEADER */}
      <div style={headerStyle}>

        <div>

          <h2 style={titleStyle}>
            EVENTS MANAGER
          </h2>

          <p style={subStyle}>
            // manage events
          </p>

        </div>

        <button
          style={addBtn}
          onClick={openAdd}
        >

          <FaPlus />

          Add Event

        </button>

      </div>

      {/* EVENTS */}
      <div style={gridStyle}>

        {events.length === 0 ? (

          <div style={emptyCard}>
            No events found
          </div>

        ) : (

          events.map((ev) => (

            <div
              key={ev._id}
              style={{
                ...eventCard,

                borderTop:
                  `3px solid ${
                    ev.coverColor ||
                    '#00aaff'
                  }`
              }}
            >

              <div
                style={{
                  fontSize: 34,

                  color:
                    ev.coverColor ||
                    '#00aaff'
                }}
              >

                {CATEGORY_ICONS[
                  ev.category
                ] || <FaCamera />}

              </div>

              <h3 style={eventTitle}>
                {ev.title}
              </h3>

              <p style={eventDesc}>
                {ev.description}
              </p>

              <div style={catLabel}>
                {ev.category}
              </div>

              <a
                href={ev.driveLink}
                target="_blank"
                rel="noreferrer"
                style={driveBtn}
              >

                <FaFolderOpen />

                Open Drive

              </a>

              <div style={actions}>

                <button
                  style={editBtn}
                  onClick={() =>
                    handleEdit(ev)
                  }
                >

                  <FaEdit />

                  Edit

                </button>

                <button
                  style={deleteBtn}
                  onClick={() =>
                    handleDelete(
                      ev._id
                    )
                  }
                >

                  <FaTrash />

                  Delete

                </button>

              </div>

            </div>
          ))
        )}
      </div>

      {/* MODAL */}
      {modal && (

        <div style={overlayStyle}>

          <div style={modalStyle}>

            <div style={modalHeader}>

              <h3 style={modalTitle}>

                {editing
                  ? 'Edit Event'
                  : 'Add Event'}

              </h3>

            </div>

            <div style={modalBody}>

              <InputField
                label="Title"
                value={form.title}
                onChange={(v) =>
                  setForm({
                    ...form,
                    title: v
                  })
                }
              />

              <TextAreaField
                label="Description"
                value={
                  form.description
                }
                onChange={(v) =>
                  setForm({
                    ...form,
                    description: v
                  })
                }
              />

              <InputField
                label="Google Drive Link"
                value={
                  form.driveLink
                }
                onChange={(v) =>
                  setForm({
                    ...form,
                    driveLink: v
                  })
                }
              />

              <div style={group}>

                <label style={label}>
                  Category
                </label>

                <select
                  style={input}
                  value={
                    form.category
                  }
                  onChange={(e) =>
                    setForm({
                      ...form,
                      category:
                        e.target
                          .value
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

              <div style={group}>

                <label style={label}>
                  Theme Color
                </label>

                <input
                  type="color"
                  style={{
                    ...input,
                    height: 60
                  }}
                  value={
                    form.coverColor
                  }
                  onChange={(e) =>
                    setForm({
                      ...form,
                      coverColor:
                        e.target
                          .value
                    })
                  }
                />

              </div>

            </div>

            <div style={modalFooter}>

              <button
                style={cancelBtn}
                onClick={() =>
                  setModal(false)
                }
              >

                Cancel

              </button>

              <button
                style={saveBtn}
                onClick={saveEvent}
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

// ===============================
// 🧩 INPUT COMPONENTS
// ===============================
function InputField({
  label,
  value,
  onChange
}) {

  return (

    <div style={group}>

      <label style={label}>
        {label}
      </label>

      <input
        style={input}
        value={value}
        onChange={(e) =>
          onChange(
            e.target.value
          )
        }
      />

    </div>
  );
}

function TextAreaField({
  label,
  value,
  onChange
}) {

  return (

    <div style={group}>

      <label style={label}>
        {label}
      </label>

      <textarea
        rows={5}
        style={{
          ...input,
          resize: 'vertical'
        }}
        value={value}
        onChange={(e) =>
          onChange(
            e.target.value
          )
        }
      />

    </div>
  );
}

// ===============================
// 🎨 STYLES
// ===============================
const headerStyle = {

  display: 'flex',

  justifyContent:
    'space-between',

  alignItems:
    isMobile
      ? 'flex-start'
      : 'center',

  flexDirection:
    isMobile
      ? 'column'
      : 'row',

  gap: 20,

  marginBottom: 30
};

const titleStyle = {

  color: '#fff',

  fontSize:
    isMobile
      ? 32
      : 48,

  letterSpacing: 4
};

const subStyle = {

  color: '#00aaff',

  marginTop: 8,

  letterSpacing: 3
};

const addBtn = {

  padding:
    '15px 26px',

  borderRadius: 16,

  border: 'none',

  background:
    'linear-gradient(135deg,#00aaff,#0066ff)',

  color: '#fff',

  display: 'flex',

  alignItems: 'center',

  gap: 10,

  cursor: 'pointer'
};

const gridStyle = {

  display: 'grid',

  gridTemplateColumns:
    isMobile
      ? '1fr'
      : 'repeat(auto-fit,minmax(320px,1fr))',

  gap: 24
};

const eventCard = {

  padding: 24,

  borderRadius: 24,

  background:
    'rgba(255,255,255,0.03)',

  border:
    '1px solid rgba(0,170,255,0.1)'
};

const eventTitle = {

  color: '#fff',

  marginTop: 16
};

const eventDesc = {

  color:
    'rgba(255,255,255,0.7)',

  lineHeight: 1.7,

  marginTop: 10
};

const catLabel = {

  marginTop: 14,

  color: '#00aaff',

  fontSize: 12,

  letterSpacing: 3
};

const driveBtn = {

  marginTop: 20,

  display: 'flex',

  alignItems: 'center',

  justifyContent:
    'center',

  gap: 10,

  padding: 14,

  borderRadius: 14,

  textDecoration: 'none',

  background:
    'rgba(0,170,255,0.1)',

  color: '#00d4ff'
};

const actions = {

  display: 'flex',

  gap: 12,

  marginTop: 18
};

const editBtn = {

  flex: 1,

  padding: 12,

  borderRadius: 14,

  border: 'none',

  cursor: 'pointer'
};

const deleteBtn = {

  flex: 1,

  padding: 12,

  borderRadius: 14,

  border: 'none',

  background:
    'rgba(255,0,80,0.15)',

  color: '#ff4d6d',

  cursor: 'pointer'
};

const emptyCard = {

  padding: 40,

  textAlign: 'center',

  borderRadius: 24,

  background:
    'rgba(255,255,255,0.03)'
};

const overlayStyle = {

  position: 'fixed',

  inset: 0,

  background:
    'rgba(0,0,0,0.7)',

  zIndex: 9999,

  display: 'flex',

  justifyContent:
    'center',

  alignItems:
    isMobile
      ? 'flex-start'
      : 'center',

  overflowY: 'auto',

  padding:
    isMobile
      ? '90px 14px 20px'
      : '40px'
};

const modalStyle = {

  width: '100%',

  maxWidth: 760,

  borderRadius: 28,

  overflow: 'hidden',

  background:
    'rgba(5,12,25,0.98)',

  border:
    '1px solid rgba(0,170,255,0.12)'
};

const modalHeader = {

  padding: 24,

  borderBottom:
    '1px solid rgba(255,255,255,0.06)'
};

const modalTitle = {

  color: '#00d4ff',

  fontSize:
    isMobile
      ? 28
      : 36
};

const modalBody = {

  padding:
    isMobile
      ? 20
      : 28,

  display: 'flex',

  flexDirection: 'column',

  gap: 22
};

const modalFooter = {

  display: 'flex',

  justifyContent:
    'flex-end',

  gap: 12,

  padding: 20,

  borderTop:
    '1px solid rgba(255,255,255,0.06)',

  background:
    'rgba(5,12,25,0.98)'
};

const cancelBtn = {

  padding:
    '14px 24px',

  borderRadius: 14,

  border:
    '1px solid rgba(255,255,255,0.08)',

  background:
    'rgba(255,255,255,0.05)',

  color: '#fff',

  cursor: 'pointer'
};

const saveBtn = {

  padding:
    '14px 26px',

  borderRadius: 14,

  border: 'none',

  background:
    'linear-gradient(135deg,#00aaff,#0066ff)',

  color: '#fff',

  cursor: 'pointer'
};

const group = {

  display: 'flex',

  flexDirection: 'column',

  gap: 10
};

const label = {

  color: '#00aaff',

  fontSize: 12,

  letterSpacing: 3
};

const input = {

  width: '100%',

  padding:
    isMobile
      ? '16px'
      : '18px',

  borderRadius: 16,

  border:
    '1px solid rgba(0,170,255,0.12)',

  background:
    'rgba(255,255,255,0.03)',

  color: '#fff',

  outline: 'none'
};