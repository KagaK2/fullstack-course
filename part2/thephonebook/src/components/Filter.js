import React from "react";

const Filter = props => {
  const handleFilterChange = e => {
    props.onChange(e.target.value);
  };
  return (
    <div>
      filter shown with
      <input onChange={handleFilterChange} value={props.filter} />
    </div>
  );
};

export default Filter;
