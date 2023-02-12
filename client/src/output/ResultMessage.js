const ResultMessage = props => {
    return (
        <div className="outputBox">
            Student studiów {props.studiesType ? props.studiesType.slice(0, props.studiesType.length - 1).toLowerCase() + "ych " : <></>}
             {props.studentName ? props.studentName : <></>} {props.studiesYear ? "(" + props.studiesYear + " rok) ": <></>} 
             {props.studentId ? "o id: " + props.studentId : <></>} otrzymał:
             {props.homeworkMarks.length > 0 ? <legend className='inputLegend'>Z prac domowych:</legend> : <></>}

            <ol style={{ fontSize: "small" }}>

                {props.homeworkMarks.map(element => {
                    return (
                        <li key={"homeworkResult" + element.key}>
                            <div>
                                Zadanie domowe: "{element.name}", ocena: {element.score}, data wystawienia: {element.date.replace("T", " ")}
                            </div>
                        </li>
                    )
                })}

            </ol>

            {props.testMarks.length > 0 ? <legend className='inputLegend'>Z testów:</legend> : <></>}

            <ol style={{ fontSize: "small" }}>

                {props.testMarks.map(element => {
                    return (
                        <li key={"testResult" + element.key}>
                            <div>
                                Test: "{element.name}", ocena: {element.score}, data wystawienia: {element.date.replace("T", " ")}
                            </div>
                        </li>
                    )
                })}

            </ol>
             - co daje średnią: {props.avgFinalScore} co daje ocenę {props.finalMark}
        </div>
    )
}

export default ResultMessage;