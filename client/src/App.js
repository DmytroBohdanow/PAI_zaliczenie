import React, { useState } from 'react';
import "./App.css";
import Name from "./input/Name.js"
import ID from "./input/ID.js"
import YearAndTypeOfStudies from "./input/YearAndTypeOfStudies"
import Email from './input/Email';
import TestMarks from './input/TestMarks';
import HomeworkAndPresentMarks from './input/HomeworkAndPresentMarks';
import ResultMessage from './output/ResultMessage';
import ExportToCSVButton from './output/ExportToCSVButton';

function App() {
  const allowedYearsOfStudies = ["I", "II", "III", "IV", "V"];
  const allowedTypesOfStudies = ["Zaoczne", "Dzienne", "Wieczorowe"];
  const allowedSubjects = ["Programowanie Aplikacji Internetowych"];

  const [emailErr, setEmailErr] = useState(true);
  const [IdErr, setIdErr] = useState(true);

  const [studentName, setStudentName] = useState('');
  const [studentId, setStudentId] = useState('');
  const [studiesType, setStudiesType] = useState('');
  const [studiesYear, setStudiesYear] = useState('');
  const [studentEmail, setStudentEmail] = useState('');
  const [testMarks, setTestMarks] = useState([]);
  const [homeworkMarks, setHomeworkMarks] = useState([]);
  const [presenceOfAStudent, setPresenceOfAStudent] = useState(true);
  const [subject, setSubject] = useState('');
  const [avgTestScore, setAvgTestScore] = useState(0);
  const [avgHomeworkScore, setAvgHomeworkScore] = useState(0);
  const [avgFinalScore, setAvgFinalScore] = useState(0);
  const [finalMark, setFinalMark] = useState('');
  const [finalMarkBoxElement, setFinalMarkBoxElement] = useState(<span className='info'>Czekam na wystawienie oceny</span>);

  const calcFinalMark = () => {
    return (avgHomeworkScore * 1 + avgTestScore * 8 + (presenceOfAStudent * 100)) / 10;
  }

  const parseScoreToLiteralMark = (score) => {
    switch (true) {
      case score < 20:
        setFinalMark("F");
        break;
      case score >= 20 && score < 40:
        setFinalMark("D");
        break;
      case score >= 40 && score < 60:
        setFinalMark("C");
        break;
      case score >= 60 && score < 80:
        setFinalMark("B");
        break;
      case score >= 80:
        setFinalMark("A");
        break;
      default:
        setFinalMark("Coś poszło nie tak...");
        break;
    }

  }

  const presentFinalMark = (mark) => {
    switch (mark) {
      case "F":
      case "D":
        return (
          <>
            <span className='error'>{mark} </span>
            <b>Student nie zdał</b>
          </>
        )
      case "C":
      case "B":
      case "A":
        return (
          <>
            <span className='success'>{mark} </span>
            <b>Student zdał</b>
          </>
        )
      default:
        return (
          <>
            <span className='info'>Czekam na wprowadzenie oceny</span>
          </>
        )
    }
  }

  React.useEffect(() => {
    setAvgFinalScore(() => calcFinalMark());
  }, [avgHomeworkScore, avgTestScore, presenceOfAStudent]);

  React.useEffect(() => {
    setFinalMark(() => parseScoreToLiteralMark(avgFinalScore));
  }, [avgFinalScore]);

  React.useEffect(() => {
    setFinalMarkBoxElement(() => presentFinalMark(finalMark));
  }, [finalMark]);

  return (
    <div className="App">
      <header className="App-header">
        <h2 style={{ "textAlign": "center" }}>Programowanie aplikacji internetowych - projekt zaliczeniowy</h2>


        <div className="inputContainer">
          <p>Wystaw oceny</p>
          <legend className='inputLegend'>Wprowadź ID studenta:</legend>
          <ID 
          studentId={studentId} 
          setStudentId={setStudentId} 
          IdErr={IdErr} 
          setIdErr={setIdErr} />
          <legend className='inputLegend'>Wprowadź imię i nazwisko:</legend>
          <Name studentName={studentName} setStudentName={setStudentName} />
          <legend className='inputLegend'>Wprowadź email:</legend>
          <Email
            studentEmail={studentEmail}
            setStudentEmail={setStudentEmail}
            emailErr={emailErr}
            setEmailErr={setEmailErr}
          />
          <hr />
          <legend className='inputLegend'>Wybierz rok i typ studiów:</legend>
          <YearAndTypeOfStudies
            allowedYearsOfStudies={allowedYearsOfStudies}
            allowedTypesOfStudies={allowedTypesOfStudies}
            setStudiesYear={setStudiesYear}
            setStudiesType={setStudiesType}
          />
          <hr />
          <legend className='inputLegend'>Wystaw oceny z testów:</legend>
          <br />
          <TestMarks
            testMarks={testMarks}
            setTestMarks={setTestMarks}
            allowedSubjects={allowedSubjects}
            subject={subject}
            setSubject={setSubject}
            avgTestScore={avgTestScore}
            setAvgTestScore={setAvgTestScore}
          />
          <hr />
          <legend className='inputLegend'>Wystaw oceny z zadań domowych i obecności:</legend>
          <HomeworkAndPresentMarks
            homeworkMarks={homeworkMarks}
            setHomeworkMarks={setHomeworkMarks}
            allowedSubjects={allowedSubjects}
            subject={subject}
            setSubject={setSubject}
            avgHomeworkScore={avgHomeworkScore}
            setAvgHomeworkScore={setAvgHomeworkScore}
            presenceOfAStudent={presenceOfAStudent}
            setPresenceOfAStudent={setPresenceOfAStudent}
          />
          <hr />
          Ocena koncowa studenta: {finalMarkBoxElement}
        </div>



        <div className="outputContainer">
        <legend className='outputLegend'>Wiadomość po wystawieniu oceny:</legend>
          <ResultMessage 
            studentName={studentName}
            studentId={studentId}
            studiesType={studiesType}
            studiesYear={studiesYear}
            homeworkMarks={homeworkMarks}
            testMarks={testMarks}
            avgFinalScore={avgFinalScore}
            finalMark={finalMark}
          />

          <ExportToCSVButton 
            studentName={studentName}
            studentId={studentId}
            studiesType={studiesType}
            studiesYear={studiesYear}
            homeworkMarks={homeworkMarks}
            testMarks={testMarks}
            avgFinalScore={avgFinalScore}
            finalMark={finalMark}
            presenceOfAStudent={presenceOfAStudent}
            subject={subject}
            IdErr={IdErr} 
            emailErr={emailErr}
          />
        </div>
      </header>
    </div>
  );
}

export default App;
