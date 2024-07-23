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
    <ul>
      {props.course.parts.map((part) =>
      <li key={part.id}>
        <Part name={part.name} numExercises={part.numExercises}/>
      </li>)}
    </ul>
  )
  
  const Total = (props) => {
    const total = props.course.parts.reduce((acc, curObj) => acc + curObj.numExercises, 0); // remember: parts is an array of objects
    return (
      <p>Number of exercises {total}</p>
    );
  }
  
  const Course = (props) => (
    <div>
      <Header course={props.course} />
      <Content course={props.course} />
      <Total course={props.course} />
    </div>
  )

  export default Course;