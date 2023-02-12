import "./Marks.css";

import { useEffect, useState, useRef } from 'react';

const HomeworkAndPresentMarks = props => {
    const currDateTime = new Date().toISOString().slice(0, 16);

    const nameInput = useRef(null);
    const scoreInput = useRef(null);
    const dateInput = useRef(null);

    const [homeworkMarkName, setHomeworkMarkName] = useState("");
    const [homeworkMarkScore, setHomeworkMarkScore] = useState(null);
    const [homeworkMarkDate, setHomeworkMarkDate] = useState(currDateTime);

    const addHomeworkMark = () => {
        props.setHomeworkMarks([
            ...props.homeworkMarks,
            {
                name: homeworkMarkName,
                key: props.homeworkMarks.length,
                subject: props.subject,
                score: homeworkMarkScore,
                date: homeworkMarkDate
            }
        ])

        nameInput.current.value = "";
        scoreInput.current.value = null;
        dateInput.current.value = currDateTime;

        setHomeworkMarkName("");
        setHomeworkMarkScore(null);
        setHomeworkMarkDate(currDateTime);
    }


    const deleteHomeworkMark = (homeworkResultToDeleteKey) => {
        props.setHomeworkMarks(props.homeworkMarks.filter((mark) => mark.key !== homeworkResultToDeleteKey))
    }

    const calcAvgHomeworkScore = () => {
        if (props.homeworkMarks.length === 0) return 0;

        return (props.homeworkMarks.reduce((acc, obj) => {
            return acc + parseInt(obj.score);
        }, 0)) / props.homeworkMarks.length;
    }

    const handlePresenseChange = () => {
        props.setPresenceOfAStudent(!props.presenceOfAStudent);
    }

    const limitHomeworkMark = (min, max, value) => {
        if (value < min) {
            setHomeworkMarkScore(min);
        } else if (value > max) {
            setHomeworkMarkScore(max);
        } else {
            setHomeworkMarkScore(value);
        }
    }

    useEffect(() => {
        props.setAvgHomeworkScore(calcAvgHomeworkScore());
    }, [props.homeworkMarks]);

    return (
        <div className="inputBox">
            <span className="smallSelectLegend">Przedmiot:</span><select onChange={e => props.setSubject(e.target.value)}>
                <option selected={true} disabled="disabled" hidden>Wybierz przedmiot</option>
                {props.allowedSubjects.map(element => {
                    return <option key={element}>{element}</option>
                })}
            </select>
            <legend className='inputLegend'>Wprowadź nazwę zadania domowego:</legend>
            <input ref={nameInput} onInput={(e) => { setHomeworkMarkName(e.target.value) }} type={"text"} />
            <legend className='inputLegend'>Wprowadź ocenę od 1 do 100:</legend>
            <input style={{ width: "30%" }} ref={scoreInput} onInput={(e) => { limitHomeworkMark(1, 100, e.target.value) }} type={"number"} />
            <legend className='inputLegend'>Data wystawienia oceny:</legend>
            <input style={{ width: "30%" }} type="datetime-local" ref={dateInput} onChange={(e) => { setHomeworkMarkDate(e.target.value) }} defaultValue={currDateTime}></input>
            <br />
            <button className='addTestResult' onClick={addHomeworkMark} disabled={!(homeworkMarkScore > 0 && homeworkMarkName.length > 0 && props.subject.length > 0)}>Dodaj ocenę z zadania domowego</button>
            <br />
            {props.homeworkMarks.length > 0 ? <legend className='inputLegend'>Oceny którę będą przypisane:</legend> : <></>}

            <ol style={{ fontSize: "small" }}>

                {props.homeworkMarks.map(element => {
                    return (
                        <li key={"homeworkResult" + element.key}>
                            <div>
                                Zadanie domowe: "{element.name}", ocena: {element.score}, data wystawienia: {element.date.replace("T", " ")}
                                <button key={"deleteBtn" + element.key} className="deleteBtn" onClick={() => { deleteHomeworkMark(element.key) }}>Usuń</button>
                            </div>
                        </li>
                    )
                })}

            </ol>
            {props.homeworkMarks.length > 0 ? <p style={{ fontSize: "small" }}>Średnia ocen z zadań domowych: <b>{props.avgHomeworkScore}</b> </p> : <></>}
            <div className="presenseBox">
                <legend className='inputLegend'>Zaznacz czy student miał pełną obecność:</legend>
                Obecność studenta: <input type="checkbox" id="presenseCheckbox" onChange={() => {handlePresenseChange()}} checked={props.presenceOfAStudent} name="presenseCheckbox" value="presense" />
            </div>
        </div >
    )
}

export default HomeworkAndPresentMarks;