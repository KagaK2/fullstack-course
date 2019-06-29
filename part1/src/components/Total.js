import React from "react";

const Total = props => {
  return (
    <React.Fragment>
      <p>Number of exercises {props.ex1 + props.ex2 + props.ex3}</p>
    </React.Fragment>
  );
};

export default Total;
