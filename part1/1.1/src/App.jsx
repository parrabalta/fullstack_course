function App() {
  const course = 'Half Stack application development'
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14

  return (
    <div>
     <Header course = {course} />
     <Content exercises1 = {exercises1} exercises2 = {exercises2} exercises3 = {exercises3} part1 = {part1} part2 = {part2} part3 = {part3}/>
     <Total exercises1 = {exercises1} exercises2 = {exercises2} exercises3 = {exercises3} />
      
    </div>
  )
}


function Header(props) {
  return (
    <h1>{props.course}</h1>
  )
}


function Content(props) {
  return(
    <>
      <p>
      {props.part1} {props.exercises1}
      </p>
      <p>
        {props.part2} {props.exercises2}
      </p>
      <p>
        {props.part3} {props.exercises3}
      </p>
    </>
  )
}

function Total(props) {
  return(
    <p>Number of exercises {props.exercises1 + props.exercises2 + props.exercises3}</p>
  )
}



export default App
