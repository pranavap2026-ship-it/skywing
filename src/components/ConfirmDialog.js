import React from 'react';

export default function ConfirmDialog({ title, message, onConfirm, onCancel }) {
  return (
    <div className="confirm-dialog">
      <div className="confirm-box">
        <h4>{title || 'CONFIRM DELETE'}</h4>
        <p>{message || 'This action cannot be undone.'}</p>
        <div className="actions">
          <button className="btn btn-secondary btn-sm" onClick={onCancel}>Cancel</button>
          <button className="btn btn-danger btn-sm" onClick={onConfirm}>Delete</button>
        </div>
      </div>
    </div>
  );
}
