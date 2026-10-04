const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      },
      {
        name: 'what?',
        exercises: 12,
        id: 4
      }
    ]
  }

  return <Course course={course} />
}

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

const Total = (props) => {
  return (
    <div>
      <p>Number of exercises {props.parts[0].exercises + props.parts[1].exercises + props.parts[2].exercises}</p>
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
export default App
