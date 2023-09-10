import Part from "./Part"

const Content = (props) => {

    console.log("props for content", props)
    
    return (
        <>
        {props.parts.map(part => {
            return <Part key={part.id} part={part}></Part>
        })}
        </>
    )
    
}

export default Content