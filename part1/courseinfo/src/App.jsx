const Header = (props) => (
  <h1>
    {props.courseName}
  </h1>
)

const Part = (props) => (
  <p>
    {props.name} {props.numExercises}
  </p>
)

const Content = (props) => (
  <div>
  <Part name={props.parts[0].name} numExercises={props.parts[0].numExercises}/>
  <Part name={props.parts[1].name} numExercises={props.parts[1].numExercises}/>
  <Part name={props.parts[2].name} numExercises={props.parts[2].numExercises}/>
  </div>
)

const Total = (props) => (
  <p>
    Number of exercises {props.parts[0].numExercises + props.parts[1].numExercises + props.parts[2].numExercises}
  </p>
)

const App = () => {
  const course = 'Half Stack application development';
  const parts = [
    {name: 'Fundamentals of React', numExercises: 10},
    {name: 'Using props to pass data', numExercises: 7},
    {name: 'State of a component', numExercises: 14}
  ];

  return (
    <div>
      <Header courseName={course} />
      <Content parts={parts} />
      <Total parts={parts} />
    </div>
  )
}

export default App