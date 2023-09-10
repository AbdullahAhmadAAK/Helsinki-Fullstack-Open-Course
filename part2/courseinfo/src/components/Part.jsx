const Part = (props) => {
    console.log("Parts props", props)

    return (
        <p>{props.part.name} {props.part.exercises}</p>
    )
}

export default Part