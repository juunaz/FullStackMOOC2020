import React from 'react'

const Header = ({ courseName }) => {
    return (
        <h1>{courseName}</h1>
    )
}
  
const Content = ({ parts }) => {
    return (
        <div>
            <Part parts={parts} />
        </div>
    )
} 
  
const Part = ({ parts }) => {
    return (
        <div>
            <ul>
                {parts.map(part =>
                <li key={part.id}>
                    "{part.name}", {part.exercises} excercises
                </li>
                )}
            </ul>
        </div>
    )
}
  
const Total = ({ parts }) => {

    const total = parts.reduce((sum, current) => sum + current.exercises, 0)

    return (
        <h4>Number of excercises {total}</h4>
    )
}
  
const Course = ({ course }) => {
    return (
        <div>
            <Header courseName={course.name} />
            <Content parts={course.parts} />
            <Total parts={course.parts} />
        </div>
    )
}


export default Course