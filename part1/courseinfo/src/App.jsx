import Content from "./components/Content"
import Header from "./components/Header"
import Total from "./components/Total"

const App = () => {

  // defining constants
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

  const courseName = course.name
  const courseParts = course.parts

  return (
    <div>
      <Header
        course={courseName}></Header>
      <Content
        parts={courseParts}></Content>
      <Total
        parts={courseParts}></Total>
    </div>
  )
}

export default App