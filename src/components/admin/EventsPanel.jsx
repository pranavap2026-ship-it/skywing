import React, {
  useState,
  useEffect,
  useCallback
} from 'react';

import { eventsAPI } from '../../api';

import { showToast } from '../Toast';

import {
  FaPalette,
  FaFutbol,
  FaMasksTheater,
  FaMicrochip,
  FaGraduationCap,
  FaStar,
  FaCamera,
  FaEdit,
  FaTrash,
  FaFolderOpen,
  FaPlus
} from 'react-icons/fa6';

const extractData = (res) =>
  Array.isArray(res.data)
    ? res.data
    : res.data?.data || [];

const isMobile =
  window.innerWidth <= 768;

const CATEGORY_ICONS = {

  arts: <FaPalette />,

  sports: <FaFutbol />,

  cultural: <FaMasksTheater />,

  tech: <FaMicrochip />,

  freshers: <FaGraduationCap />,

  farewell: <FaStar />,

  other: <FaCamera />
};

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
  // LOAD EVENTS
  // ===============================
  const load = useCallback(
    async () => {

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
    },
    []
  );

  useEffect(() => {
    load();
  }, [load]);

  // ===============================
  // SAVE EVENT
  // ===============================
  const save = async () => {

    if (
      !form.title.trim() ||
      !form.description.trim() ||
      !form.driveLink.trim()
    ) {

      return showToast(
        'All fields required',
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
          form.driveLink
            .trim()
            .replace(/\s/g, ''),

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
          'Event Updated 🚀'
        );

      } else {

        await eventsAPI.create(
          payload
        );

        showToast(
          'Event Created ✅'
        );
      }

      setModal(false);

      setEditing(null);

      setForm({

        title: '',

        description: '',

        driveLink: '',

        category: 'other',

        coverColor: '#00aaff'
      });

      load();

    } catch (err) {

      console.error(err);

      showToast(
        err?.response?.data
          ?.message ||
          'Failed to save',
        'error'
      );

    } finally {

      setLoading(false);
    }
  };

  // ===============================
  // EDIT EVENT
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
  // DELETE
  // ===============================
  const handleDelete = async (
    id
  ) => {

    if (
      !window.confirm(
        'Delete this event?'
      )
    )
      return;

    try {

      await eventsAPI.delete(id);

      showToast(
        'Deleted 🗑️'
      );

      load();

    } catch (err) {

      console.error(err);

      showToast(
        'Delete failed',
        'error'
      );
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

          <p style={labelStyle}>
            // manage skywing events
          </p>

        </div>

        <button
          style={addBtn}
          onClick={() =>
            setModal(true)
          }
        >

          <FaPlus />

          Add Event

        </button>

      </div>

      {/* STATS */}
      <div style={statsWrap}>

        <div style={statCard}>
          <h2>{events.length}</h2>
          <p>Total Events</p>
        </div>

        <div style={statCard}>
          <h2>
            {
              events.filter(
                e =>
                  e.category ===
                  'arts'
              ).length
            }
          </h2>

          <p>Arts Events</p>
        </div>

        <div style={statCard}>
          <h2>
            {
              events.filter(
                e =>
                  e.category ===
                  'sports'
              ).length
            }
          </h2>

          <p>Sports Events</p>
        </div>

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
                  `3px solid ${ev.coverColor}`
              }}
            >

              <div
                style={{
                  fontSize: 38,

                  color:
                    ev.coverColor
                }}
              >

                {
                  CATEGORY_ICONS[
                    ev.category
                  ]
                }

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

              <FormInput
                label="Event Title"
                value={form.title}
                onChange={(v) =>
                  setForm({
                    ...form,
                    title: v
                  })
                }
              />

              <FormTextArea
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

              <FormInput
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
                    height: 65
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
                onClick={() => {

                  setModal(false);

                  setEditing(null);
                }}
              >

                Cancel

              </button>

              <button
                style={saveBtn}
                onClick={save}
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
// INPUT COMPONENTS
// ===============================
function FormInput({
  label,
  value,
  onChange
}) {

  return (

    <div style={group}>

      <label style={labelStyle2}>
        {label}
      </label>

      <input
        style={input}
        value={value}
        onChange={(e) =>
          onChange(e.target.value)
        }
      />

    </div>
  );
}

function FormTextArea({
  label,
  value,
  onChange
}) {

  return (

    <div style={group}>

      <label style={labelStyle2}>
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
          onChange(e.target.value)
        }
      />

    </div>
  );
}

// ===============================
// STYLES
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

  fontSize:
    isMobile
      ? 34
      : 50,

  color: '#fff',

  letterSpacing: 4,

  fontFamily:
    'Orbitron,sans-serif'
};

const labelStyle = {

  color: '#00aaff',

  letterSpacing: 4,

  marginTop: 10
};

const addBtn = {

  padding:
    '16px 28px',

  borderRadius: 18,

  border: 'none',

  display: 'flex',

  alignItems: 'center',

  gap: 10,

  background:
    'linear-gradient(135deg,#00aaff,#0066ff)',

  color: '#fff',

  cursor: 'pointer'
};

const statsWrap = {

  display: 'grid',

  gridTemplateColumns:
    isMobile
      ? '1fr'
      : 'repeat(3,1fr)',

  gap: 20,

  marginBottom: 30
};

const statCard = {

  padding: 24,

  borderRadius: 24,

  background:
    'rgba(255,255,255,0.03)',

  border:
    '1px solid rgba(0,170,255,0.12)',

  textAlign: 'center'
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

  borderRadius: 26,

  background:
    'rgba(255,255,255,0.03)',

  border:
    '1px solid rgba(0,170,255,0.1)',

  backdropFilter:
    'blur(14px)'
};

const eventTitle = {

  color: '#fff',

  marginTop: 18,

  marginBottom: 12
};

const eventDesc = {

  color:
    'rgba(255,255,255,0.72)',

  lineHeight: 1.8
};

const catLabel = {

  marginTop: 14,

  color: '#00aaff',

  textTransform:
    'uppercase',

  letterSpacing: 3,

  fontSize: 12
};

const driveBtn = {

  marginTop: 20,

  display: 'flex',

  alignItems: 'center',

  justifyContent:
    'center',

  gap: 10,

  padding: 14,

  borderRadius: 16,

  background:
    'rgba(0,170,255,0.1)',

  textDecoration: 'none',

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

  borderRadius: 24,

  textAlign: 'center',

  background:
    'rgba(255,255,255,0.03)'
};

const overlayStyle = {

  position: 'fixed',

  inset: 0,

  background:
    'rgba(0,0,0,0.72)',

  zIndex: 9999,

  overflowY: 'auto',

  padding:
    isMobile
      ? '90px 14px 20px'
      : '40px',

  display: 'flex',

  justifyContent:
    'center',

  alignItems:
    isMobile
      ? 'flex-start'
      : 'center'
};

const modalStyle = {

  width: '100%',

  maxWidth: 760,

  borderRadius: 30,

  overflow: 'hidden',

  background:
    'rgba(5,12,25,0.98)',

  border:
    '1px solid rgba(0,170,255,0.12)'
};

const modalHeader = {

  padding: 26,

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
      : 30,

  display: 'flex',

  flexDirection: 'column',

  gap: 22
};

const modalFooter = {

  display: 'flex',

  justifyContent:
    'flex-end',

  gap: 12,

  padding:
    isMobile
      ? 18
      : 24,

  borderTop:
    '1px solid rgba(255,255,255,0.06)',

  position: 'sticky',

  bottom: 0,

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
    'rgba(255,255,255,0.04)',

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

  gap: 12
};

const labelStyle2 = {

  color: '#00aaff',

  letterSpacing: 4,

  fontSize: 12,

  textTransform:
    'uppercase'
};

const label = labelStyle2;

const input = {

  width: '100%',

  padding:
    isMobile
      ? '16px'
      : '18px',

  borderRadius: 18,

  border:
    '1px solid rgba(0,170,255,0.15)',

  background:
    'rgba(255,255,255,0.03)',

  color: '#fff',

  outline: 'none'
};