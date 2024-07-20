const Header = (props) => (
  <h1>
    {props.course.name}
  </h1>
)

const Part = (props) => (
  <p>
    {props.name} {props.numExercises}
  </p>
)

const Content = (props) => (
  <div>
  <Part name={props.course.parts[0].name} numExercises={props.course.parts[0].numExercises}/>
  <Part name={props.course.parts[1].name} numExercises={props.course.parts[1].numExercises}/>
  <Part name={props.course.parts[2].name} numExercises={props.course.parts[2].numExercises}/>
  </div>
)

const Total = (props) => (
  <p>
    Number of exercises {props.course.parts[0].numExercises + props.course.parts[1].numExercises + props.course.parts[2].numExercises}
  </p>
)

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {name: 'Fundamentals of React', numExercises: 10},
      {name: 'Using props to pass data', numExercises: 7},
      {name: 'State of a component', numExercises: 14}
    ]
  };

  return (
    <div>
      <Header course={course} />
      <Content course={course} />
      <Total course={course} />
    </div>
  )
}

export default App