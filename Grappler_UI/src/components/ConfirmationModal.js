import React, { useState } from 'react';

function ConfirmationModal({ onConfirm, onCancel }) {
  return (
    <div className="confirmation-modal">
      <div className="modal-content">
        <p>Custom confirmation message goes here.</p>
        <button onClick={onConfirm}>Yes</button>
        <button onClick={onCancel}>No</button>
      </div>
    </div>
  );
}

export default ConfirmationModal;
