import "./ID.css"

const ID = props => {

    return (
        <div className="inputBox IDBox">
            <input type={"number"} onInput={e => props.setStudentId(e.target.value)} />
            {props.studentId.length === 9 ? (
                <p className='validationMsg success'>ID poprawne</p>
            ) : (props.studentId.length !== 9 ? (
                <p className='validationMsg error'>ID musi zawierać dokładnie 9 liczb</p>
            ) : (<></>)
            )}
        </div>
    )
}

export default ID;