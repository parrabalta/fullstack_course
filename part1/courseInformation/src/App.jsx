function App() {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }
  console.log(course.parts[0].name)
  return (
    <div>
     <Header course = {course.name} />
     <Content partes = {course.parts}/>
     <Total partes = {course.parts} />
      
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
      <Part part = {props.partes[0]} />
      <Part part = {props.partes[1]} />
      <Part part = {props.partes[2]} />
    </>
  )
}



function Part(props) {
  console.log(props.part)
  return(
    <p>
      {props.part.name} {props.part.exercises}
    </p>
  )
}




function Total(props) {
  return(
    <p>Number of exercises {props.partes[0].exercises + props.partes[1].exercises + props.partes[2].exercises}</p>
  )
}



export default App
