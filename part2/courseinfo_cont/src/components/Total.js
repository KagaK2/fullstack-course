import React from "react";

const Total = props => {
  return (
    <React.Fragment>
      <h4>
        Number of exercises:
        {props.parts.reduce((accumulator, currentPart) => {
          return accumulator + currentPart.exercises;
        }, 0)}
      </h4>
    </React.Fragment>
  );
};

export default Total;
