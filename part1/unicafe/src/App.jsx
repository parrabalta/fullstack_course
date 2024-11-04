import { useState } from 'react'


const Button = (props) => {

return(

<button onClick={props.handleClick}>{props.text}</button>

)
}

const StatisticLine = (props) => {
  return(
  <tr>
  <td>{props.text}</td> 
  <td>{props.value} </td>
  </tr>
  )
}


const App = () => {

  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)




  if(good + bad + neutral > 0) {

  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={()=> setGood(good + 1)} text = "good"/>
      <Button handleClick={()=> setNeutral(neutral + 1)} text = "neutral"/>
      <Button handleClick={()=> setBad(bad + 1)} text = "bad"/>
      <h2>statistics</h2>

      <table>
      <StatisticLine text = "good" value = {good}/>
      <StatisticLine text = "neutral" value = {neutral}/>
      <StatisticLine text = "bad" value = {bad}/>
      <StatisticLine text = "all" value = {good + bad + neutral}/>
      <StatisticLine text = "avg" value = {(good - bad) / (good + bad + neutral)}/>
      <StatisticLine text = "positive" value = {good  / (good + bad + neutral)}/>
      </table>
    </div>
  )
} else {
  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={()=> setGood(good + 1)} text = "good"/>
      <Button handleClick={()=> setNeutral(neutral + 1)} text = "neutral"/>
      <Button handleClick={()=> setBad(bad + 1)} text = "bad"/>
      <h2>statistics</h2>
      <p>no feedback return</p>
      
    </div>
  )

}
}

export default App