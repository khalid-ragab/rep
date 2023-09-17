import React, { useState } from 'react';
import "./list.scss";
import deleteIcon from './icons/delete.png';
import editIcon from './icons/edit.png'
const ItemList = ({ tasks, onDeleteTask, onCheckboxChange , selectedOption, onEditTask }) => {
  const [selectedTask, setSelectedTask] = useState(null);

  const handleEdit = (task) => {  
    console.log(task);
    setSelectedTask(task);
    onEditTask(task);
  };

  const handleDelete = (index, event) => {
    event.stopPropagation();
    onDeleteTask(index);
  };

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const formattedDate = `${hours}:${minutes} - ${date.toLocaleDateString()}`;
    return formattedDate;
  };

  const handleCheckboxChange = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].checked = !updatedTasks[index].checked;
    onCheckboxChange(updatedTasks);
  };
  const filteredTasks = tasks.filter((task) => {
    if (selectedOption === "completed") {
      return task.checked;
    } else if (selectedOption === "incomplete") {
      return !task.checked;
    }
    return true; 
  });
  
  return (
    <div className="list">
      {filteredTasks?.length ? (
        <ul className="list__ul">
          {filteredTasks.map((task, index) => (
            <li
              className={`task ${task.checked ? 'checked' : ''}`}
              key={index}
            >
              <div className="task__item">
                <input
                  type="checkbox"
                  className="task__checkbox"
                  checked={task.checked}
                  onClick={() => handleCheckboxChange(index)}
                />

                <p className="task__name">{task.text}</p>
                <p className="task__timestamp">{task.timestamp}</p>
                <div className="edit">
                <button 
                className="edit__button"
                  onClick={() => handleEdit(task)}>
                  <img 
                  src={editIcon} 
                  alt="Edit" 
                  className="edit__icon"
                  />
                  </button>
                </div>
                <div className="delete">
                  <button
                    className="delete__button"
                    onClick={(event) => handleDelete(index, event)}
                  >
                    <img
                      src={deleteIcon}
                      alt="Delete"
                      className="delete__icon"
                    />
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="list__txt">No Todos</p>
      )}
    </div>
  );
};

export default ItemList;



