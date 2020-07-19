import React, { useState } from 'react'
import ReactDOM from 'react-dom'

//Buttons component
const Button = ({onClick, text}) => {
  return (
    <button onClick={onClick}>
      {text}
    </button>
  )
}


const App = ({anecdotes}) => {
  const [selected, setSelected] = useState(0)
  const [points, setPoints] = useState(new Uint8Array(6))
  const [maxPoints, setMaxPoints] = useState(0)

  // Handling random anecdote on button click
  const handleClick = () => {
    setSelected(Math.floor(Math.random() * anecdotes.length));
  }

  // Handling the voting on button click
  const handleVote = () => {
    const copyOfPoints = {...points}
    copyOfPoints[selected] += 1
    setPoints(copyOfPoints)
    console.log(copyOfPoints)

    if (points[selected] >= points[maxPoints]) {
      setMaxPoints(selected)
    }
  }

  //App display
  return (
    <div>
      <h1>Anecdote of the Day:</h1>
      <Button onClick={handleClick} text="Random Anecdote"/>
      <Button onClick={handleVote} text="Vote me!"/>
      <p>{anecdotes[selected]}</p>
      <p>I have {points[selected]} votes</p>
      <h1>Anecdote with the most votes:</h1>
      <p>{anecdotes[maxPoints]}</p>
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)