import "./YearAndTypeOfStudies.css"

const YearAndTypeOfStudies = props => {

    return (
        <div>
            <span className="smallSelectLegend">Rok:</span><select onChange={e => props.setStudiesYear(e.target.value)}>
            <option selected="true" disabled="disabled" hidden>Wybierz rok</option>   
                {props.allowedYearsOfStudies.map(element => {
                    return <option key={element}>{element}</option>
                })}
            </select>
            <span className="smallSelectLegend">Typ:</span><select onChange={e => props.setStudiesType(e.target.value)}>
            <option selected="true" disabled="disabled" hidden>Wybierz typ</option>   
                {props.allowedTypesOfStudies.map(element => {
                    return <option key={element}>{element}</option>
                })}
            </select>
        </div>
    )
}

export default YearAndTypeOfStudies;