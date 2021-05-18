import React from 'react';
import './Input.css'


//Input box with label
function Input(props){

    return(
        <div>
            <label className="form-label" htmlFor={props.name}>{props.label}</label>
            <input className="input-box" value={props.value} type={props.type} name={props.name} id={props.name} placeholder={props.placeholder} onChange={props.onChange} maxLength={props.maxLength}/>
            {/*Print Validation errors */}
            <p className="error">{props.error}</p>
        </div>

    )

}
export default Input;