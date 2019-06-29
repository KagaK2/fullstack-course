import React from "react";

const Total = props => {
  return (
    <React.Fragment>
      <p>
        Number of exercises:
        {props.parts.reduce((accumulator, currentPart) => {
          return accumulator + currentPart.exercises;
        }, 0)}
      </p>
    </React.Fragment>
  );
};

export default Total;
