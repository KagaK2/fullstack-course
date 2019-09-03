import React, { useState, useEffect } from "react";
import axios from "axios";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");
  useEffect(() => {
    axios.get("http://localhost:3001/persons").then(response => {
      setPersons(response.data);
    });
  }, []);
  const onFormSubmit = () => {
    const filteredArray = persons.filter(person => person.name === newName);
    if (filteredArray.length === 0) {
      //setPersons([...persons, { name: newName, number: newNumber }]);
      axios
        .post("http://localhost:3001/persons", {
          name: newName,
          number: newNumber
        })
        .then(response => {
          setPersons([...persons, response.data]);
        });
    } else {
      window.alert(`${newName} is already added to phonebook`);
    }
    setNewName("");
    setNewNumber("");
  };

  return (
    <div>
      {persons.length > 0 ? (
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
      ) : (
        <div>Loading</div>
      )}
    </div>
  );
};

export default App;
