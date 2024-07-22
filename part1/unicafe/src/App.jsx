import { useState } from 'react'

const Feedback = ({incGood, incNeutral, incBad}) => {
  return (
    <div>
      <h1>Give Feedback</h1>
      <button onClick={incGood}>Good</button>
      <button onClick={incNeutral}>Neutral</button>
      <button onClick={incBad}>Bad</button>
    </div>
  );
}

const Statistics = ({good, neutral, bad, total}) => {
  const goodScore = 1;
  const badScore = -1;
  const avgScore = (total === 0) ? 0 : (good * goodScore + bad * badScore) / total; // avoid dividing by 0
  const posPercent = (good / total) * 100;

  if (total > 0) {
    return (
      <div>
        <h1>Statistics</h1>
        <table>
          <tbody>
            <StatisticsLine text='Good Reviews' value={good}/>
            <StatisticsLine text='Neutral Reviews' value={neutral}/>
            <StatisticsLine text='Bad Reviews' value={bad}/>
            <StatisticsLine text='All Reviews' value={total}/>
            <StatisticsLine text='Average Score' value={avgScore}/>
            <StatisticsLine text='Positive %' value={posPercent}/>
          </tbody>
        </table>
      </div>
    );
  }

  return (
    <div>
      <h1>Statistics</h1>
      <p>No feedback given!</p>
    </div>
  );
}

const StatisticsLine = ({text, value}) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  );
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <Feedback incGood={() => setGood(good + 1)} incNeutral={() => setNeutral(neutral + 1)} incBad={() => setBad(bad + 1)}/>
      <Statistics good={good} neutral={neutral} bad={bad} total={good + neutral + bad}/>
    </div>
  )
}

export default App