import React from "react";

const Part = props => {
  return (
    <React.Fragment>
      <p>
        {props.part} {props.exercises}
      </p>
    </React.Fragment>
  );
};

export default Part;
