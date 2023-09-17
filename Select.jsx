import React from "react";
import "./select.scss";
  const Select = ({ onChange, selectedOption }) => {
    const handleSelectChange = (event) => {
      onChange(event.target.value); 
    };
  return (
    <div className="select">
      <select
        className="select__box"
        id="taskSelector"
        value={selectedOption}
        onChange={handleSelectChange}
        name="taskSelector"
      >
        <option className="select__item" value="all">
          All
        </option>
        <option className="select__item" value="completed">
          Completed
        </option>
        <option className="select__item" value="incomplete">
          Incomplete
        </option>
      </select>
    </div>
  );
}
export default Select
