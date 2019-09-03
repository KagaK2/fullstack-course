import React from "react";
import Person from "./Person";

const Persons = props => {
  return (
    <div>
      {props.persons
        .filter(person =>
          person.name.toLowerCase().includes(props.filter.toLowerCase())
        )
        .map(person => {
          return (
            <Person key={person.name} person={person} onClick={props.onClick} />
          );
        })}
    </div>
  );
};

export default Persons;
