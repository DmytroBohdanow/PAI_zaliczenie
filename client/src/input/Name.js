import "./Name.css";

const Name = props => {

    

    return (
        <div className="inputBox">
            <input onInput={e => props.setStudentName(e.target.value)} />
            {props.studentName.length > "Joe Doe".length ? (
                <p className='validationMsg success'>Wow! Twoje imię jest dłuższe od Joe Doe!</p>
            ) : (
                props.studentName.length > 0 ? (
                    <p className='validationMsg info'>Hm, twoje imię nie jest wcale długie</p>
                ) : (<></>)
            )}
        </div>
    )
};

export default Name;