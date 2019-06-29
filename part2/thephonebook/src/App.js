import React, { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([{ name: "Arto Hellas" }]);
  const [newName, setNewName] = useState("");

  const handleNameChange = e => {
    setNewName(e.target.value);
  };
  const handleFormSubmit = e => {
    e.preventDefault();
    setPersons([...persons, { name: newName }]);
    setNewName("");
  };
  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={handleFormSubmit}>
        <div>
          name:
          <input onChange={handleNameChange} value={newName} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map(person => {
        return <p key={person.name}>{person.name}</p>;
      })}
    </div>
  );
};

export default App;
