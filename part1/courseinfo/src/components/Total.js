import React from "react";

const Total = props => {
  return (
    <React.Fragment>
      <p>
        Number of exercises:
        {props.parts[0].exercises +
          props.parts[1].exercises +
          props.parts[2].exercises}
      </p>
    </React.Fragment>
  );
};

export default Total;
