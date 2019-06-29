import React from "react";

const PersonForm = props => {
  const handleNameChange = e => {
    props.onNameChange(e.target.value);
  };
  const handleNumberChange = e => {
    props.onNumberChange(e.target.value);
  };
  const handleFormSubmit = e => {
    e.preventDefault();
    props.onFormSubmit();
  };
  return (
    <form onSubmit={handleFormSubmit}>
      <div>
        name:
        <input onChange={handleNameChange} value={props.newName} required />
      </div>
      <div>
        number:
        <input onChange={handleNumberChange} value={props.newNumber} required />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

export default PersonForm;
