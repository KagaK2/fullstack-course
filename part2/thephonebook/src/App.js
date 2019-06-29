import React, { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([{ name: "Arto Hellas" }]);
  const [newName, setNewName] = useState("");

  const handleNameChange = e => {
    setNewName(e.target.value);
  };
  const handleFormSubmit = e => {
    e.preventDefault();
    const filteredArray = persons.filter(person => person.name === newName);
    if (filteredArray.length === 0) {
      setPersons([...persons, { name: newName }]);
    } else {
      window.alert(`${newName} is already added to phonebook`);
    }
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
