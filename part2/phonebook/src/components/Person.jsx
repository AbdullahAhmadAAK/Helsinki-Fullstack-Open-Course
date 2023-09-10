
const Person = (props) => {

    return (
        <div>
            <span key={props.person.id}>{props.person.name} {props.person.number}</span>
            <button onClick={() => props.handleDeleteClick(props.person)}>Delete</button>
        </div>
    )
}

export default Person