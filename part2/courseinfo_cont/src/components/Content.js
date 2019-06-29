import React from "react";
import Part from "./Part";

const Content = props => {
  const renderParts = array => {
    const parts = array.map(part => {
      return (
        <Part key={part.name} part={part.name} exercises={part.exercises} />
      );
    });
    return parts;
  };
  return <div>{renderParts(props.parts)}</div>;
};

export default Content;
