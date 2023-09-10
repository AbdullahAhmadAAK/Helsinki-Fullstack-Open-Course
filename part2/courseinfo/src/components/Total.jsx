const Total = (props) => {

    const initial_sum = 0
    let sumExercises = props.parts.reduce((accumulator, current_part) => {
        return accumulator + current_part.exercises
    }, initial_sum)

    return (
        <p>total of {sumExercises} exercises</p>
    )
}

export default Total