const StatisticLine = (props) => {
    return (
        <tr>
            <td>{props.text}</td>
            <td>{props.value} {props.text==="positive"?"%":""}</td>
        </tr>
    )
}

export default StatisticLine