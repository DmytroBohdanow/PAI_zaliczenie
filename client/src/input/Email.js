import { validEmail } from "../validation/Regex";

const Email = props => {

    const validate = (input) => {
        if (!validEmail.test(input)) {
            props.setEmailErr(true);
            props.setStudentEmail(input);
        } else {
            props.setEmailErr(false);
            props.setStudentEmail(input);
        }

        
    };

    return (
        <div className="inputBox">
            <input onInput={e => validate(e.target.value)}/>
            {props.emailErr ? (
                <p className='validationMsg error'>Email jest błędny</p>
            ) : (
                !props.emailErr && props.studentEmail ? (
                    <p className='validationMsg success'>Email jest poprawny</p>
                ) : (<></>)
            )}
        </div>
    )
}

export default Email;