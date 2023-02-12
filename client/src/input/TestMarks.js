import "./Marks.css";

import { useEffect, useState, useRef } from 'react';

const TestMarks = props => {
    const currDateTime = new Date().toISOString().slice(0, 16);

    const nameInput = useRef(null);
    const scoreInput = useRef(null);
    const dateInput = useRef(null);

    const [markName, setMarkName] = useState("");
    const [markScore, setMarkScore] = useState(null);
    const [markDate, setMarkDate] = useState(currDateTime);

    const addTestMark = () => {
        props.setTestMarks([
            ...props.testMarks,
            {
                name: markName,
                key: props.testMarks.length,
                subject: props.subject,
                score: markScore,
                date: markDate
            }
        ])

        nameInput.current.value = "";
        scoreInput.current.value = null;
        dateInput.current.value = currDateTime;

        setMarkName("");
        setMarkScore(null);
        setMarkDate(currDateTime);
    }


    const deleteTestMark = (testResultToDeleteKey) => {
        props.setTestMarks(props.testMarks.filter((mark) => mark.key !== testResultToDeleteKey))
    }

    const calcAvgTestScore = () => {
        if (props.testMarks.length === 0) return 0;

        return (props.testMarks.reduce((acc, obj) => {
            return acc + parseInt(obj.score);
        }, 0)) / props.testMarks.length;
    }

    const limitTestMark = (min, max, value) => {
        if (value < min) {
            setMarkScore(min);
        } else if (value > max) {
            setMarkScore(max);
        } else {
            setMarkScore(value);
        }
    }

    useEffect(() => {
        props.setAvgTestScore(calcAvgTestScore());
    }, [props.testMarks]);

    return (
        <div className="inputBox">
            <span className="smallSelectLegend">Przedmiot:</span><select onChange={e => props.setSubject(e.target.value)}>
                <option selected={true} disabled="disabled" hidden>Wybierz przedmiot</option>
                {props.allowedSubjects.map(element => {
                    return <option key={element}>{element}</option>
                })}
            </select>
            <legend className='inputLegend'>Wprowadź nazwę testu:</legend>
            <input ref={nameInput} onInput={(e) => { setMarkName(e.target.value) }} type={"text"} />
            <legend className='inputLegend'>Wprowadź ocenę od 1 do 100:</legend>
            <input style={{ width: "30%" }} ref={scoreInput} onInput={(e) => { limitTestMark(1, 100, e.target.value) }} type={"number"} />
            <legend className='inputLegend'>Data wystawienia oceny:</legend>
            <input style={{ width: "30%" }} type="datetime-local" ref={dateInput} onChange={(e) => { setMarkDate(e.target.value) }} defaultValue={currDateTime}></input>
            <br />
            <button className='addTestResult' onClick={addTestMark} disabled={!(markScore > 0 && markName.length > 0 && props.subject.length > 0)}>Dodaj ocenę z testu</button>
            <br />
            {props.testMarks.length > 0 ? <legend className='inputLegend'>Oceny którę będą przypisane:</legend> : <></>}

            <ol style={{ fontSize: "small" }}>

                {props.testMarks.map(element => {
                    return (
                        <li key={"testResult" + element.key}>
                            <div>
                                Test: "{element.name}", ocena: {element.score}, data wystawienia: {element.date.replace("T", " ")}
                                <button key={"deleteBtn" + element.key} className="deleteBtn" onClick={() => { deleteTestMark(element.key) }}>Usuń</button>
                            </div>
                        </li>
                    )
                })}

            </ol>
            {props.testMarks.length > 0 ? <p style={{ fontSize: "small" }}>Średnia ocen z testów: <b>{props.avgTestScore}</b> </p> : <></>}
        </div >
    )
}

export default TestMarks;