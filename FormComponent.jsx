import React, { useState } from 'react';
import './form.scss';
const FormComponent = ({ 
  buttonText,
  onSubmit,
  onCancel,
  value,
  }) => {
console.log(value);
  const [selectedOption, setSelectedOption] = useState('all');
  const [textInput, setTextInput] = useState(value);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (textInput.trim() !== '') {
      onSubmit(textInput); 
    }
  }

    const handleInputChange = (event) => {
      event.preventDefault();
      setTextInput(event.target.value)
    }
  
  const handleSelectChange = (event) => {
    setSelectedOption(event.target.value);
  };

  return (
    <form
     onSubmit={handleSubmit}
     className="form"
     overlayClassName="form__overlay"
    >
      <div>
        <p className="form__text">Title</p>

      </div>
      <input
      className='form__input'
      value={textInput}
      onChange={handleInputChange}
      />
      <div>
        <p className="form__text2"> Status</p>
        <select
          className="form__select"
          value={selectedOption} 
          onChange={handleSelectChange} 
        >
          <option value="completed">Completed</option>
          <option value="incomplete">Incomplete</option>
        </select>
      </div>
      <div className="buttons">
        <button type="submit" className="form__submit">
          {buttonText}
        </button>
        <button onClick={onCancel} className="form__cancel">
          Cancel
        </button>
      </div>
    </form>
  );
};

export default FormComponent;
