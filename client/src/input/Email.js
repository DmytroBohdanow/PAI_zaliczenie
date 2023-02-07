import { validEmail } from "../validation/Regex";

const Email = props => {

    const validate = (input) => {
        if (!validEmail.test(input)) {
            props.setEmailErr(true);
            props.setStudentEmail(input);
            console.log("not pass" + props.emailErr + input);
        } else {
            props.setEmailErr(false);
            props.setStudentEmail(input);
            console.log("pass" + props.emailErr + input);
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