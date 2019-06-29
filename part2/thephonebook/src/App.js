import React, { useState } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456" },
    { name: "Ada Lovelace", number: "39-44-5323523" },
    { name: "Dan Abramov", number: "12-43-234345" },
    { name: "Mary Poppendieck", number: "39-23-6423122" }
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");

  const onFormSubmit = () => {
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
      <Filter onChange={setFilter} filter={filter} />
      <PersonForm
        onNameChange={setNewName}
        onNumberChange={setNewNumber}
        newName={newName}
        newNumber={newNumber}
        onFormSubmit={onFormSubmit}
      />
      <h2>Numbers</h2>
      <Persons persons={persons} filter={filter} />
    </div>
  );
};

export default App;
