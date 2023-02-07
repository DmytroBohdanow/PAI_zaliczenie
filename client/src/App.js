import React, { useState } from 'react';
import "./App.css";
import Name from "./input/Name.js"
import ID from "./input/ID.js"
import YearAndTypeOfStudies from "./input/YearAndTypeOfStudies"

function App() {
  const allowedYearsOfStudies = ["I", "II", "III", "IV", "V"];
  const allowedTypesOfStudies = ["Zaoczne", "Dzienne", "Wieczorowe"];

  const [data, setData] = useState(null);
  const [studentName, setStudentName] = useState(0);
  const [studentId, setStudentId] = useState(0);
  const [studiesType, setStudiesType] = useState(null);
  const [studiesYear, setStudiesYear] = useState(null);

  React.useEffect(() => {
    fetch("/api")
      .then((res) => res.json())
      .then((data) => setData(data.message));
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h2 style={{"textAlign": "center"}}>Programowanie aplikacji internetowych - projekt zaliczeniowy</h2>


        <div className="inputContainer">
          <p>Wystaw ocenę</p>
          <legend className='inputLegend'>Wprowadź ID studenta:</legend>
          <ID studentId={studentId} setStudentId={setStudentId} />
          <legend className='inputLegend'>Wprowadź imię i nazwisko:</legend>
          <Name studentName={studentName} setStudentName={setStudentName} />
          <hr />
          <legend className='inputLegend'>Wybierz rok i typ studiów:</legend>
          <YearAndTypeOfStudies
            allowedYearsOfStudies={allowedYearsOfStudies}
            allowedTypesOfStudies={allowedTypesOfStudies}
            setStudiesYear={setStudiesYear}
            setStudiesType={setStudiesType}
          />
          <hr />
        </div>



        <div className="outputContainer">
          {studentId}
          {studentName}
          {studiesType}
          {studiesYear}
        </div>

        {/* <p>{!data ? "Loading..." : data}</p> */}
      </header>
    </div>
  );
}

export default App;
