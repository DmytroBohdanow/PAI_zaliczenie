import { useEffect } from 'react';

const TestMarks = props => {

    const addInputBox = () => {
        props.setTestList([...props.testList,
        <div key={"testBox" + props.testList.length}>
            <legend className='inputLegend'>Test {props.testList.length + 1}:</legend>
            <input type={"number"} id={"testInput" + props.testList.length} />
            <button onClick={() => { deleteInputBox("testBox" + props.testList.length) }}>Usuń ocenę</button>
        </div>])
    }


    const deleteInputBox = (testBoxToDeleteKey) => {
        const newTestList = props.testList.filter(testBox => testBox.key !== testBoxToDeleteKey)
        console.log(props.testList)
    }

    return (
        <div className="inputBox">
            {props.testList}
            <button onClick={() => { addInputBox() }}>Dodaj ocenę z testu</button>
        </div>
    )
}

export default TestMarks;