import "./ID.css"

const ID = props => {

    const validate = (input) => {
        if (input.length === 9) {
            props.setIdErr(false);
            props.setStudentId(input);
        } else if (input.length !== 9) {
            props.setIdErr(true);
            props.setStudentId(input);
        }

        
    };

    return (
        <div className="inputBox IDBox">
            <input type={"number"} onInput={e => validate(e.target.value)} />
            {props.IdErr ? <p className='validationMsg error'>ID musi zawierać dokładnie 9 liczb</p> : <p className='validationMsg success'>ID poprawne</p>}
        </div>
    )
}

export default ID;