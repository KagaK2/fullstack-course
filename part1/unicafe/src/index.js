import React, { useState } from "react";
import ReactDOM from "react-dom";

const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  return (
    <div>
      <div>
        <h1>What is your feedback for today?</h1>
        <div>
          <Button onClick={() => setGood(good + 1)} text="Good" />
          <Button onClick={() => setNeutral(neutral + 1)} text="Neutral" />
          <Button onClick={() => setBad(bad + 1)} text="Bad" />
        </div>
      </div>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  );
};

const Button = props => {
  return <button onClick={props.onClick}>{props.text}</button>;
};

const Statistic = props => {
  return (
    <tr>
      <td>{props.text}</td>
      <td>{props.value}</td>
    </tr>
  );
};

const Statistics = props => {
  return (
    <div>
      <h1>Statistics</h1>
      {props.good + props.neutral + props.bad > 0 ? (
        <table>
          <tbody>
            <Statistic text="good" value={props.good} />
            <Statistic text="neutral" value={props.neutral} />
            <Statistic text="bad" value={props.bad} />
            <Statistic
              text="average"
              value={
                (props.good - props.bad) /
                (props.good + props.neutral + props.bad)
              }
            />
            <Statistic
              text="positive"
              value={
                props.good / (props.good + props.neutral + props.bad) + "%"
              }
            />
          </tbody>
        </table>
      ) : (
        "No feedback given"
      )}
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
