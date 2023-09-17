import React from 'react';
import Modal from 'react-modal';
import FormComponent from './FormComponent';
const AddModal = ({ isOpen, closeModal, onAddSuccess, textInput}) => {
  const handleAddSubmit = (textInput) => {
    if (textInput.trim() !== '') {
      const date = new Date();
      const hours = date.getHours().toString().padStart(2, '0');
      const minutes = date.getMinutes().toString().padStart(2, '0');
      const formattedTimestamp = `${hours}:${minutes}, ${date.toLocaleDateString()}`;
      
      const newTask = {
        text: textInput,
        checked: false,
        timestamp: formattedTimestamp,
      };
      onAddSuccess(newTask)
      closeModal()
  }}
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      contentLabel="Add Task Modal"
      className="modal"
      overlayClassName="modal__overlay"
    >
      <h2 className='modal__title'>Add Todo</h2>
      
      <button className="modal__close" onClick={closeModal}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
          <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>
      
        <FormComponent
        buttonText="Add Task"
        onSubmit={handleAddSubmit}
        onCancel={closeModal}
        value={""}
        />
    </Modal>
  );
};
export default AddModal;