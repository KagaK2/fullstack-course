import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";

const App = props => {
  const [selected, setSelected] = useState(0);
  const [points, setPoints] = useState(defaultPoints);
  const [mostVoted, setMostVoted] = useState(0);

  const handleClick = () => {
    const newPoints = [...points];
    newPoints[selected]++;
    setPoints(newPoints);
  };

  useEffect(() => {
    const newMostVoted = points.indexOf(Math.max(...points));
    setMostVoted(newMostVoted);
  }, [points]);
  return (
    <div>
      <h1>Anecdotes of the day</h1>
      <p>{props.anecdotes[selected]}</p>
      <p>has {points[selected]} votes</p>
      <button onClick={handleClick}>Vote</button>
      <button
        onClick={() => {
          setSelected(Math.floor(Math.random() * props.anecdotes.length));
        }}
      >
        Next Anecdotes
      </button>
      <h1>Anecdotes with most votes</h1>
      <p>{props.anecdotes[mostVoted]}</p>
    </div>
  );
};

const anecdotes = [
  "If it hurts, do it more often",
  "Adding manpower to a late software project makes it later!",
  "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
  "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
  "Premature optimization is the root of all evil.",
  "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it."
];

const defaultPoints = Array(anecdotes.length).fill(0);

ReactDOM.render(<App anecdotes={anecdotes} />, document.getElementById("root"));
