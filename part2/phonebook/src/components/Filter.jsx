const Filter = (props) => {
    return (
        <>
            <label htmlFor="searchFilterNames">filter shown with</label>
            <input id='searchFilterNames' value={props.searchFilter} onChange={props.handleFilterChange}></input>
        </>
    )
}

export default Filter