const HighestAnecdote = (props) => {

    const max_number = Math.max(...props.votes)
    const max_number_index = props.votes.indexOf(max_number)
    const max_voted_anecdote = props.anecdotes[max_number_index]

    // console.log(max_number)
    // console.log(max_number_index)
    // console.log(max_voted_anecdote)

    return(
        <>
            <h1>Anecdote with most votes</h1>
            {max_voted_anecdote} <br />
            has {max_number} votes
        </>
    )
}

export default HighestAnecdote