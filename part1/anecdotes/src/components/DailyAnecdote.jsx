const DailyAnecdote = (props) => {
    return (
        <>
            <h1>Anecdote of the Day</h1>
            {props.anecdote} <br />
            has {props.votes} votes
        </>
    )
}

export default DailyAnecdote