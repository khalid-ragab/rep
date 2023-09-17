import React, { useState } from 'react';
import Modal from 'react-modal';
import FormComponent from './FormComponent';

const EditModal = ({ isOpen, closeModal, handleEditTask, taskToEdit, tasks, setTasks, }) => {
  
  const handleEditSubmit = (updatedName) => {
      const date = new Date();
      const hours = date.getHours().toString().padStart(2, '0');
      const minutes = date.getMinutes().toString().padStart(2, '0');
      const formattedTimestamp = `${hours}:${minutes}, ${date.toLocaleDateString()}`;
      const updatedTask = {
        ...taskToEdit,
        timestamp: formattedTimestamp,
        text:updatedName,
      };

      const updatedTasks = tasks.map((taskItem) =>
        taskItem.id === taskToEdit.id ? updatedTask : taskItem
      );
      setTasks(updatedTasks);
      localStorage.setItem('tasks', JSON.stringify(updatedTasks));
      closeModal();
  };
console.log(taskToEdit);
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      contentLabel="Edit Task Modal"
      className="modal"
      overlayClassName="modal__overlay"
    >
      <h2 className='modal__title'>Update Todo</h2>

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
        buttonText="Update Task"
        onSubmit={handleEditSubmit}
        closeModal={closeModal}
        onCancel={closeModal}
        value={taskToEdit?.text}
      />
    </Modal>
  );
};

export default EditModal;
