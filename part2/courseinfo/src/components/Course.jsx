const Course = ({ course }) => {
  return (<div>
      <Header course={course.name} />

      <Content 
      parts={course.parts} />

      <Total 
      parts={course.parts} />
  </div>)
}

const Header = (props) => {
  return (
    <div>
      <h1>{props.course}</h1>
    </div>
  )
}

const Content = ( {parts} ) => {
  return (
    <div>
      {parts.map(part => <Part p={part} key={part.id}/>)}
    </div>
  )
}

const Total = ( {parts} ) => {
  const exercises = parts.map(part => part.exercises)
  const sum = exercises.reduce((acc, x) => acc + x, 0)
  return (
    <div>
      <b>Total of {sum} exercises</b>
    </div>
  )
}

const Part = (props) => {
  return (
    <div>
      <p>{props.p.name} {props.p.exercises}</p>
    </div>
  )
}

export default Course