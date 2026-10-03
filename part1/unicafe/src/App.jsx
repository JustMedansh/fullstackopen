import { useState } from 'react'

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const goodHandler = () => {
    console.log(`good registered, value ${good + 1}`)
    setGood(good + 1)
  }

  const neutralHandler = () => {
    console.log(`neutral registered, value ${neutral + 1}`)
    setNeutral(neutral + 1)
  }

  const badHandler = () => {
    console.log(`bad registered, value ${bad + 1}`)
    setBad(bad + 1)
  }

  return (
    <div>
      <h1>give feedback</h1>
      <Button label="good" onClick={goodHandler}/>
      <Button label="neutral" onClick={neutralHandler}/>
      <Button label="bad" onClick={badHandler}/>

      <Statistics good={good} bad={bad} neutral={neutral} />
    </div>
  )
}

const StatisticLine = ({ text,value }) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  )
}

const Button = ({ label, onClick }) => {
  return (
    <button onClick={onClick}>
      {label}
    </button>
  )
}

const Statistics = ({ good, neutral, bad }) => {
  const getTotal = () => (good + bad + neutral)
  const getAverage = () => ((good - bad) / getTotal())
  const getPositive = () => ((good / getTotal()) * 100)

  if (getTotal() != 0) {
    return (
    <div>
      <h1>statistics</h1>
      <table>
        <tbody>
          <StatisticLine text="good" value={good} />
          <StatisticLine text="neutral" value={neutral} />
          <StatisticLine text="bad" value={bad} />
          <StatisticLine text="total" value={getTotal()} />

          <StatisticLine text="average" value={getAverage()} />
          <StatisticLine text="positive" value={getPositive() + ' %'} />
        </tbody>
      </table>
    </div>
    )
  }

  else {
    return (<div>
      <h1>statistics</h1>
      <p>No feedback given</p>
    </div>)
  }
}


export default App