import StatisticLine from "./StatisticLine"

const Statistics = (props) => {
  
  const all = props.good + props.neutral + props.bad
  const average = (props.good*1 + props.neutral*0 + props.bad*-1 ) / all
  const positive = props.good * 100 / all
  
  if(all === 0) {
    return (
      <>
        <h1>statistics</h1>
        No feedback given
      </>
    )
  }

  else {
    return (
      <>
        <h1>statistics</h1>
        <table>
            <tbody>
                <StatisticLine text="good" value={props.good}></StatisticLine>
                <StatisticLine text="neutral" value={props.neutral}></StatisticLine>
                <StatisticLine text="bad" value={props.bad}></StatisticLine>
                <StatisticLine text="all" value={all}></StatisticLine>
                <StatisticLine text="average" value={average}></StatisticLine>
                <StatisticLine text="positive" value={positive}></StatisticLine>
            </tbody>
        </table>
        
      </>
    )
  }
}

export default Statistics