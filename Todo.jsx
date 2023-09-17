import React, { useState, useEffect } from 'react';
import './todo.scss';
import Select from './Select';
import ItemList from './List';
import AddModal from './AddModal';
import EditModal from './EditModal';

const TodoApp = () => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState(null);
  const [selectedOption, setSelectedOption] = useState('all');
  const [tasks, setTasks] = useState(JSON.parse(localStorage.getItem('tasks')) || []);

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem('tasks'));
    if (storedTasks) {
      setTasks(storedTasks);
    }
  }, []);

  const handleDeleteTask = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
  };

  const openAddModal = () => {
    setIsAddModalOpen(true);
  };

  const closeAddModal = () => {
    setIsAddModalOpen(false);
  };

  const openEditModal = (task) => {
    setTaskToEdit(task);
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    setTaskToEdit(null);
    setIsEditModalOpen(false);
  };

  const handleSelectChange = (selectedOption) => {
    setSelectedOption(selectedOption); 
  };

  const handleCheckboxChange = (updatedTasks) => {
    setTasks(updatedTasks);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
  };

  const addTask = (newTask) => {
    const updatedTasks = [newTask, ...tasks];
    setTasks(updatedTasks);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
  };

  const filteredTasks = tasks.filter((task) => {
    if (selectedOption === 'completed') {
      return task.checked;
    } else if (selectedOption === 'incomplete') {
      return !task.checked;
    } else {
      return true; 
    }
  });

  return (
    <div>
      <div className="both">
        <button className="modal__button" onClick={openAddModal}>
          Add Task
        </button>{' '}
        <Select onChange={handleSelectChange} selectedOption={selectedOption}/>
      </div>
      <AddModal
        isOpen={isAddModalOpen}
        closeModal={closeAddModal}
        onAddSuccess={addTask}
      />
      <EditModal
        isOpen={isEditModalOpen}
        closeModal={closeEditModal}
        taskToEdit={taskToEdit}
        tasks={tasks}
        setTasks={setTasks}
      />
      <ItemList
        tasks={filteredTasks}
        onDeleteTask={handleDeleteTask}
        onCheckboxChange={handleCheckboxChange}
        selectedOption={selectedOption}
        onEditTask={openEditModal}
      />
    </div>
  );
};

export default TodoApp;
