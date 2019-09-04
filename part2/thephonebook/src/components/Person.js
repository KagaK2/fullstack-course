import React from "react";

const Person = props => {
  return (
    <div>
      <div>{`${props.person.name} ${props.person.number}`}</div>
      <button
        onClick={() => {
          props.onClick(props.person.id, props.person.name);
        }}
      >
        delete
      </button>
    </div>
  );
};

export default Person;
