import React, { useState } from "react";
// import Modal from "react-modal";

import { Modal, Button, Form } from "react-bootstrap";
Modal.setAppElement("#root"); // Set the root element

function AddFolderModal({ isOpen, onRequestClose, onAddFolder }) {
  const [folderName, setFolderName] = useState("");

  const handleAddFolder = () => {
    onAddFolder(folderName);
    setFolderName("");
    onRequestClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Add Folder Modal"
    >
      <h2>Add Folder</h2>
      <input
        type="text"
        placeholder="Folder Name"
        value={folderName}
        onChange={(e) => setFolderName(e.target.value)}
      />
      <button onClick={handleAddFolder}>Add Folder</button>
      <button onClick={onRequestClose}>Cancel</button>
    </Modal>
  );
}

export default AddFolderModal;
