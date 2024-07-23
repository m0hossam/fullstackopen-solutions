import Course from './components/Course.jsx' // the './' refers to the current importing directory i.e. 'src'

const App = () => {
  const courses = [
    {
      id: 1,
      name: 'Half Stack application development',
      parts: [
        {id: 1, name: 'Fundamentals of React', numExercises: 10},
        {id: 2, name: 'Using props to pass data', numExercises: 7},
        {id: 3, name: 'State of a component', numExercises: 14},
        {id: 4, name: 'Redux', numExercises: 11}
      ]
    },
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {name: 'Routing', numExercises: 3, id: 1},
        {name: 'Middlewares', numExercises: 7, id: 2}
      ]
    }
  ];

  return (
    <ul>
      {courses.map((course) => 
      <li key={course.id}>
        <Course course={course}/>
      </li>)}
    </ul>
  );
}

export default App