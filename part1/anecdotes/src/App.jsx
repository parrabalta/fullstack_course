import { useState } from 'react'



const Button = (props) => {
  return <button onClick = {props.handleClick}>{props.text}</button>
}




const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
   
  let n = Math.floor(Math.random() * anecdotes.length)

  const initialPoints = Array(anecdotes.length).fill(0)

  const [selected, setSelected] = useState(n)
  const [points, setPoints] = useState(initialPoints)
  const [top, setTop] = useState(n)
  


  const handleNext = () => {
    n = Math.floor(Math.random() * anecdotes.length)
    setSelected(n)
    
  }

  const handleVote = () => {
    const newPoints = [...points]
    newPoints[selected] += 1
    const newTop = newPoints.indexOf(Math.max(...newPoints))
    setPoints(newPoints)
    setTop(newTop)
    console.log(top)
  }

  return (
    <div>
      <h1> Anecdote of the day</h1>
      <p>{anecdotes[selected]}</p>
      <Button text = "next" handleClick = {handleNext}/>
      <Button text = "vote" handleClick = {handleVote}/> <p>Votes: {points[selected]}</p>
      <h2> Anecdote with most votes</h2>
      <p>{anecdotes[top]}</p>
      <p>Votes: {points[top]}</p>
    </div>
  )
}

export default App