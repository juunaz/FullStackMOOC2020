import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = ({onClick, text}) => (
  <button onClick={onClick}>
    {text}
  </button>
)

const StatisticsLine = ({text, value}) => {
  if (text === "Positive") {
    return (
      <tr>
        <td style={{paddingRight: "10px"}}>
          {text}
        </td>
        <td>
        {value} %
        </td>
      </tr>
    )
}
  return (
    <tr>
      <td style={{paddingRight: "10px"}}>
        {text}
      </td>
      <td>
        {value}
      </td>
    </tr>
  )
}

const Statistics = (props) => {
  if (props.total === 0) {
    return (
      <tbody>
        <tr>
          <td>
            No feedback given yet.
          </td>
        </tr>
      </tbody>
    )
  }  

  return (
  <tbody>
    <StatisticsLine text="Great" value={props.good} />
    <StatisticsLine text="Neutral" value={props.neutral} />
    <StatisticsLine text="Bad" value={props.bad} />
    <StatisticsLine text="Total" value={props.total} />
    <StatisticsLine text="Average" value={props.average} />
    <StatisticsLine text="Positive" value={props.positive} />
  </tbody>
  )
}

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [all, setAll] = useState([])
  let total = (good + neutral + bad)
  let average = ((all.reduce((a, b) => a + b, 0)/total))
  let positive = ((good / total)*100)

  const handleGoodClick = () => {
    setAll(all.concat(1))
    setGood(good + 1)
  }

  const handleNeutralClick = () => {
    setAll(all.concat(0))
    setNeutral(neutral + 1)
  }

  const handleBadClick = () => {
    setAll(all.concat(-1))
    setBad(bad + 1)
  }

  return (

    <div>
      <h1>Give Feedback:</h1>
      <Button onClick={handleGoodClick} text="Great!"/>
      <Button onClick={handleNeutralClick} text="Neutral"/>
      <Button onClick={handleBadClick} text="Bad"/>
      <h1>Statistics</h1>
      <table>
      <Statistics total={total} average={average} positive={positive} good={good} neutral={neutral} bad={bad} all={all} />
      </table>
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)