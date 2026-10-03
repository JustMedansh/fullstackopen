import { useState } from 'react'

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(new Array(anecdotes.length).fill(0))
  
  const nextHandler = () => {
    const randomElement = Math.floor(Math.random() * anecdotes.length)
    setSelected(randomElement)
  }

  const voteHandler = () => {
    console.log(`voted for ${anecdotes[selected]}; votes: ${votes[selected] + 1}`)
    const newVotes = [...votes]
    newVotes[selected] += 1
    setVotes(newVotes)
  }

  const getHighestVoted = () => {
    const index = votes.indexOf(Math.max(...votes));
    console.log(index)
    return (index)
  }

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <p>{anecdotes[selected]}</p>
      <p>has {votes[selected]} votes</p>
      <Button label="next anecdote" onClick={nextHandler} />
      <Button label="vote" onClick={voteHandler} />

      <h1>Anecdote with highest votes</h1>
      <p>{anecdotes[getHighestVoted()]}</p>
    </div>
  )
}

const Button = ({ label, onClick }) => {
  return (
    <button onClick={onClick}>
      {label}
    </button>
  )
}

export default App 