import { useState } from 'react'
import Statistics from './components/Statistics'
import Button from './components/Button'

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  
  const addGood = () => {
    setGood(good+1)
    let newGood = good+1
    console.log("Good counts:", newGood)
  }
  const addNeutral = () => {
    setNeutral(neutral+1)
    let newNeutral = neutral+1
    console.log("Neutral counts:", newNeutral)
  }
  const addBad = () => {
    setBad(bad+1)
    let newBad = bad+1
    console.log("Bad counts:", newBad)
  }

  return (
    <div>
      <h1>give feedback</h1>
      <Button clickHandler={addGood} name={"good"}></Button>
      <Button clickHandler={addNeutral} name={"neutral"}></Button>
      <Button clickHandler={addBad} name={"bad"}></Button>
      <Statistics
        bad={bad}
        neutral={neutral}
        good={good}></Statistics>
    </div>
  )
}

export default App