import React, { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-1234567" }
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");

  const handleNameChange = e => {
    setNewName(e.target.value);
  };
  const handleNumberChange = e => {
    setNewNumber(e.target.value);
  };
  const handleFormSubmit = e => {
    e.preventDefault();
    const filteredArray = persons.filter(person => person.name === newName);
    if (filteredArray.length === 0) {
      setPersons([...persons, { name: newName, number: newNumber }]);
    } else {
      window.alert(`${newName} is already added to phonebook`);
    }
    setNewName("");
    setNewNumber("");
  };
  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={handleFormSubmit}>
        <div>
          name:
          <input onChange={handleNameChange} value={newName} required />
        </div>
        <div>
          number:{" "}
          <input onChange={handleNumberChange} value={newNumber} required />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map(person => {
        return (
          <p key={person.name}>
            {person.name} {person.number}
          </p>
        );
      })}
    </div>
  );
};

export default App;
