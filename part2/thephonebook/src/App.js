import React, { useState, useEffect } from "react";
import phonebookService from "./services/phonebooks";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import Notifications from "./components/Notifications";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");
  const [noti, setNoti] = useState("");
  const [notiType, setNotiType] = useState("none");
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
          setNoti(`${newName} has been added to the phonebook`);
          setNotiType("noti");
          setTimeout(() => {
            setNoti("");
            setNotiType("none");
          }, 2500);
        });
    } else {
      phonebookService
        .update(filteredArray[0].id, { name: newName, number: newNumber })
        .then(response => {
          let newArray = persons.filter(
            person => person.id != response.data.id
          );
          setPersons([...newArray, response.data]);
          setNoti(`${newName}'s number has been changed`);
          setNotiType("noti");
          setTimeout(() => {
            setNoti("");
            setNotiType("none");
          }, 2500);
        })
        .catch(err => {
          setNoti(`${newName} has been already deleted from the database`);
          setNotiType("error");
          let deletedArray = persons.filter(person => person.name != newName);
          setPersons(deletedArray);
          setTimeout(() => {
            setNoti("");
            setNotiType("none");
          }, 2500);
        });
    }
    setNewName("");
    setNewNumber("");
  };

  const deletePerson = (id, name) => {
    if (window.confirm("Do you really want to delete this entry?")) {
      phonebookService
        .erase(id)
        .then(response => {
          const filteredArray = persons.filter(person => person.id != id);
          setPersons(filteredArray);
          setNoti(`${name} is deleted`);
          setNotiType("noti");
          setTimeout(() => {
            setNoti("");
            setNotiType("none");
          }, 2500);
        })
        .catch(err => {
          setNoti(`${name} has been already deleted from the database`);
          setNotiType("error");
          let deletedArray = persons.filter(person => person.name != name);
          setPersons(deletedArray);
          setTimeout(() => {
            setNoti("");
            setNotiType("none");
          }, 2500);
        });
    }
  };

  return (
    <div>
      {persons.length > 0 ? (
        <div>
          <h2>Phonebook</h2>
          <Notifications type={notiType} message={noti} />
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
