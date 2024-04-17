import React, { useState } from 'react';
import Modal from 'react-modal';
import axios from 'axios';

Modal.setAppElement('#root'); // Set the app root element for screen reader accessibility

function ChangeDescriptionModal({ isOpen, onClose, row, column }) {
  const [description, setDescription] = useState('');

  const handleChange = (event) => {
    setDescription(event.target.value);
  };

  const handleSubmit = () => {
    

    const payload = {
      [column]: {
        description: description
      }
    };

    axios.patch(`http://127.0.0.1:8000/tables/${row?.name}`, payload)
    .then(function (response) {
      window.location.reload();
    })
    .catch(function (error) {
      console.log(error);
    });
    setDescription(''); // Clear input after submission
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={onClose}>
      <h2>Change Description</h2>
      <input
        type="text"
        value={description}
        onChange={handleChange}
        placeholder="Enter new description"
      />
      <button onClick={handleSubmit}>Submit</button>
    </Modal>
  );
}

export default ChangeDescriptionModal;
