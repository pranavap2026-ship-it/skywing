import React, {
  useState,
  useEffect,
  useCallback
} from 'react';

import { membersAPI } from '../../api';
import { showToast } from '../Toast';

import {
  FaInstagram,
  FaUserGraduate,
  FaCrown
} from 'react-icons/fa';

const extractData = (res) =>
  Array.isArray(res.data)
    ? res.data
    : res.data?.data || [];

export default function MembersPanel() {

  const [members, setMembers] = useState([]);
  const [modal, setModal] = useState(false);
  const [editing, setEditing] = useState(null);
  const [loading, setLoading] = useState(false);

  const [imageFile, setImageFile] =
    useState(null);

  // ===============================
  // 📦 FORM
  // ===============================
  const [form, setForm] = useState({
    name: '',
    role: '',
    className: '',
    instagramLink: '',
    order: 0,
    isLeader: false
  });

  // ===============================
  // 🔄 LOAD MEMBERS
  // ===============================
  const load = useCallback(async () => {

    try {

      const res =
        await membersAPI.getAll();

      const sorted =
        extractData(res).sort(
          (a, b) => {

            if (
              a.isLeader &&
              !b.isLeader
            )
              return -1;

            if (
              !a.isLeader &&
              b.isLeader
            )
              return 1;

            return (
              (a.order || 0) -
              (b.order || 0)
            );
          }
        );

      setMembers(sorted);

    } catch (err) {

      console.error(err);

      setMembers([]);
    }

  }, []);

  useEffect(() => {
    load();
  }, [load]);

  // ===============================
  // 💾 SAVE MEMBER
  // ===============================
  const save = async () => {

    if (
      !form.name.trim() ||
      !form.role.trim()
    ) {
      return showToast(
        'Name & Role required',
        'error'
      );
    }

    setLoading(true);

    try {

      const data = new FormData();

      data.append(
        'name',
        form.name.trim()
      );

      data.append(
        'role',
        form.role.trim()
      );

      data.append(
        'className',
        form.className.trim()
      );

      data.append(
        'instagramLink',
        form.instagramLink.trim()
      );

      data.append(
        'order',
        form.order
      );

      data.append(
        'isLeader',
        form.isLeader
      );

      if (imageFile) {

        data.append(
          'photo',
          imageFile
        );
      }

      if (editing) {

        await membersAPI.update(
          editing,
          data
        );

        showToast(
          'Member updated ✅'
        );

      } else {

        await membersAPI.create(
          data
        );

        showToast(
          'Member added 🚀'
        );
      }

      // RESET
      setModal(false);
      setEditing(null);
      setImageFile(null);

      setForm({
        name: '',
        role: '',
        className: '',
        instagramLink: '',
        order: 0,
        isLeader: false
      });

      load();

    } catch (err) {

      console.error(err);

      showToast(
        err?.response?.data?.message ||
          'Failed to save member',
        'error'
      );

    } finally {

      setLoading(false);
    }
  };

  // ===============================
  // ✏️ EDIT
  // ===============================
  const handleEdit = (m) => {

    setEditing(m._id);

    setForm({
      name: m.name || '',
      role: m.role || '',
      className:
        m.className || '',
      instagramLink:
        m.instagramLink || '',
      order:
        m.order || 0,
      isLeader:
        m.isLeader || false
    });

    setModal(true);
  };

  // ===============================
  // ❌ DELETE
  // ===============================
  const handleDelete = async (id) => {

    if (
      !window.confirm(
        'Delete this member?'
      )
    ) return;

    try {

      await membersAPI.delete(id);

      showToast('Deleted 🗑️');

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
      <div
        style={{
          display: 'flex',
          justifyContent:
            'space-between',
          alignItems: 'center',
          marginBottom: 25
        }}
      >
        <div>
          <h2 className="section-title">
            TEAM MANAGER
          </h2>

          <p className="section-label">
            // manage skywing crew
          </p>
        </div>

        <button
          className="btn btn-primary"
          onClick={() =>
            setModal(true)
          }
        >
          + Add Member
        </button>
      </div>

      {/* MEMBERS */}
      <div
        className="grid-3"
        style={{ marginTop: 20 }}
      >
        {members.length === 0 ? (

          <div className="card">
            <p
              style={{
                color:
                  'var(--gray)'
              }}
            >
              No members found
            </p>
          </div>

        ) : (

          members.map((m) => (

            <div
              key={m._id}
              className="card"
              style={{
                textAlign: 'center',
                position: 'relative',
                overflow: 'hidden'
              }}
            >

              {/* LEADER BADGE */}
              {m.isLeader && (

                <div
                  style={{
                    position:
                      'absolute',
                    top: 14,
                    right: 14,
                    background:
                      'rgba(255,215,0,0.12)',
                    border:
                      '1px solid rgba(255,215,0,0.3)',
                    color:
                      '#ffd700',
                    padding:
                      '6px 10px',
                    borderRadius: 30,
                    display: 'flex',
                    alignItems:
                      'center',
                    gap: 6,
                    fontSize: 11,
                    letterSpacing: 1
                  }}
                >
                  <FaCrown />

                  LEADER
                </div>
              )}

              {/* PHOTO */}
              <div
                style={{
                  marginBottom: 18
                }}
              >
                {m.photo ? (

                  <img
                    src={m.photo}
                    alt={m.name}
                    style={{
                      width: 95,
                      height: 95,
                      borderRadius:
                        '50%',
                      objectFit:
                        'cover',
                      border:
                        '2px solid var(--blue)',
                      boxShadow:
                        '0 0 25px rgba(0,170,255,0.25)'
                    }}
                  />

                ) : (

                  <div
                    style={{
                      width: 95,
                      height: 95,
                      borderRadius:
                        '50%',
                      display: 'flex',
                      alignItems:
                        'center',
                      justifyContent:
                        'center',
                      margin:
                        '0 auto',
                      background:
                        'rgba(0,170,255,0.08)',
                      fontSize: 36
                    }}
                  >
                    📸
                  </div>
                )}
              </div>

              {/* NAME */}
              <h3
                style={{
                  marginBottom: 8
                }}
              >
                {m.name}
              </h3>

              {/* ROLE */}
              <p
                style={{
                  color:
                    'var(--blue)',
                  marginBottom: 6,
                  fontSize: 13,
                  letterSpacing: 2
                }}
              >
                {m.role}
              </p>

              {/* CLASS */}
              {m.className && (
                <div
                  style={{
                    display: 'flex',
                    alignItems:
                      'center',
                    justifyContent:
                      'center',
                    gap: 6,
                    marginBottom: 12,
                    color:
                      'var(--gray)',
                    fontSize: 13
                  }}
                >
                  <FaUserGraduate />

                  {m.className}
                </div>
              )}

              {/* INSTAGRAM */}
              {m.instagramLink && (
                <a
                  href={m.instagramLink}
                  target="_blank"
                  rel="noreferrer"
                  style={{
                    display: 'flex',
                    alignItems:
                      'center',
                    justifyContent:
                      'center',
                    gap: 6,
                    color: '#ff4fa3',
                    textDecoration:
                      'none',
                    marginBottom: 18,
                    fontSize: 14
                  }}
                >
                  <FaInstagram />

                  Instagram Profile
                </a>
              )}

              {/* POSITION */}
              <div
                style={{
                  marginBottom: 18,
                  fontSize: 12,
                  color:
                    'var(--gray)'
                }}
              >
                Position:
                {' '}
                {m.order}
              </div>

              {/* ACTIONS */}
              <div
                style={{
                  display: 'flex',
                  gap: 10,
                  justifyContent:
                    'center'
                }}
              >
                <button
                  className="btn btn-secondary btn-sm"
                  onClick={() =>
                    handleEdit(m)
                  }
                >
                  Edit
                </button>

                <button
                  className="btn btn-danger btn-sm"
                  onClick={() =>
                    handleDelete(
                      m._id
                    )
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
                ? 'Edit Member'
                : 'Add Member'}
            </h3>

            {/* NAME */}
            <div className="form-group">
              <label className="form-label">
                Name
              </label>

              <input
                className="form-input"
                value={form.name}
                onChange={(e) =>
                  setForm({
                    ...form,
                    name:
                      e.target.value
                  })
                }
              />
            </div>

            {/* ROLE */}
            <div className="form-group">
              <label className="form-label">
                Role
              </label>

              <input
                className="form-input"
                value={form.role}
                onChange={(e) =>
                  setForm({
                    ...form,
                    role:
                      e.target.value
                  })
                }
              />
            </div>

            {/* CLASS */}
            <div className="form-group">
              <label className="form-label">
                Class
              </label>

              <input
                className="form-input"
                placeholder="S6 CSE"
                value={form.className}
                onChange={(e) =>
                  setForm({
                    ...form,
                    className:
                      e.target.value
                  })
                }
              />
            </div>

            {/* INSTAGRAM */}
            <div className="form-group">
              <label className="form-label">
                Instagram Profile Link
              </label>

              <input
                className="form-input"
                placeholder="https://instagram.com/username"
                value={form.instagramLink}
                onChange={(e) =>
                  setForm({
                    ...form,
                    instagramLink:
                      e.target.value
                  })
                }
              />
            </div>

            {/* POSITION */}
            <div className="form-group">
              <label className="form-label">
                Position Priority
              </label>

              <input
                type="number"
                className="form-input"
                value={form.order}
                onChange={(e) =>
                  setForm({
                    ...form,
                    order:
                      e.target.value
                  })
                }
              />

              <small
                style={{
                  color:
                    'var(--gray)',
                  fontSize: 12
                }}
              >
                Lower number appears first
              </small>
            </div>

            {/* LEADER */}
            <div
              style={{
                display: 'flex',
                alignItems:
                  'center',
                gap: 10,
                marginBottom: 20
              }}
            >
              <input
                type="checkbox"
                checked={
                  form.isLeader
                }
                onChange={(e) =>
                  setForm({
                    ...form,
                    isLeader:
                      e.target.checked
                  })
                }
              />

              <label>
                Main Team Member ⭐
              </label>
            </div>

            {/* PHOTO */}
            <div className="form-group">
              <label className="form-label">
                Photo
              </label>

              <input
                type="file"
                className="form-input"
                onChange={(e) =>
                  setImageFile(
                    e.target.files[0]
                  )
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
                  ? 'Update Member'
                  : 'Save Member'}
              </button>

            </div>
          </div>
        </div>
      )}
    </div>
  );
}