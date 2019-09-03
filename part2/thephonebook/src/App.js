import React, { useState, useEffect } from "react";
import phonebookService from "./services/phonebooks";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");
  useEffect(() => {
    phonebookService.getAll().then(response => {
      setPersons(response.data);
    });
  }, []);
  const onFormSubmit = () => {
    const filteredArray = persons.filter(person => person.name === newName);
    if (filteredArray.length === 0) {
      //setPersons([...persons, { name: newName, number: newNumber }]);
      phonebookService
        .create({
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

  const deletePerson = id => {
    if (window.confirm("Do you really want to delete this entry?")) {
      phonebookService.erase(id).then(response => {
        const filteredArray = persons.filter(person => person.id != id);
        setPersons(filteredArray);
      });
    }
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
          <Persons persons={persons} filter={filter} onClick={deletePerson} />
        </div>
      ) : (
        <div>Loading</div>
      )}
    </div>
  );
};

export default App;
