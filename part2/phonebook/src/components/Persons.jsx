import Person from "./Person"

const Persons = (props) => {
    
    if(props.persons != []) {

        
        return (
            <>
                {
                    props.persons.map((person) => {
                        if(person.name.toLowerCase().match(props.searchFilter.toLowerCase() )) {
                            return (
                                <Person
                                    key={person.id}
                                    person={person}
                                    handleDeleteClick={props.handleDeleteClick}></Person>
                            )
                        }
                })}
            </>
        )
    }
}

export default Persons