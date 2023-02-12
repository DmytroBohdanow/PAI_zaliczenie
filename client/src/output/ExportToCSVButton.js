import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import FileDownload from 'js-file-download';

const ExportToCSVButton = props => {
    const navigate = useNavigate();

    const [exportError, setExportError] = useState(null);
    const [exportSuccess, setExportSuccess] = useState(null);

    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
            studentId: props.studentId,
            studentName: props.studentName,
            studiesType: props.studiesType,
            studiesYear: props.studiesYear,
            homeworkMarks: props.homeworkMarks,
            testMarks: props.testMarks,
            avgFinalScore: props.avgFinalScore,
            finalMark: props.finalMark,
            presenceOfAStudent: props.presenceOfAStudent,
            subject: props.subject,
        })
    };

    const sendRequestToServer = () => {
        fetch('/api', requestOptions)
        .then(async response => {
            console.log(response);
            if (!response.ok) {
                const error = response.status;
                return Promise.reject(error);
            } else {
                setExportError(null);
                setExportSuccess(true);
                axios.get('/api').then(res => FileDownload(res.data, 'ocena.csv'));
            }
        })
        .catch(error => {
            setExportError({ errorMessage: error.toString() });
            setExportSuccess(false);
            console.error('There was an error!', error);
        });
    }

    return <div>
        <button onClick={sendRequestToServer} disabled={props.IdErr || props.emailErr}>Wyeksportuj do CSV</button>
        {exportError ? <p className="error">Wystapił błąd zapisu. {exportError.errorMessage}</p> : <></>}
        {props.IdErr ? <p className="error">Popraw ID studenta</p> : <></>}
        {props.emailErr ? <p className="error">Popraw email studenta</p> : <></>}
        {props.studentName.length === 0 ? <p className="info">Wprowadź imię studenta</p> : <></>}
        {props.studiesType.length === 0 ? <p className="info">Wprowadź typ studiów</p> : <></>}
        {props.studiesYear.length === 0 ? <p className="info">Wprowadź rok studiów</p> : <></>}
        {props.homeworkMarks.length === 0 && props.testMarks.length === 0 ? <p className="info">Żadna ocena nie zostanie przypisana</p> : <></>}
            
        {exportSuccess ? <p className="success">Udało się!</p> : <></>}
    </div>
} 

export default ExportToCSVButton;