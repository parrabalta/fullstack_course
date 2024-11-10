const Header = ({text}) => <h2>{text}</h2>


const Part = ({part}) => {
    return(
        <p>
          {part.name} {part.exercises}
        </p>
      )
}



const Course = ({course}) => {
    console.log(course)
    const total = course.parts.reduce( (a,part) => a + part.exercises,0)
    console.log("total: ",total)
    return (
        <div>

        <Header text = {course.name}></Header>
        {course.parts.map(part => (
        <Part key={part.id} part={part} />  
      ))}
        <p><b>total of {total} exercises</b></p>
        </div>
    )
  }
  

export default Course