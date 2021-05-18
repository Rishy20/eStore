import React from "react";
import './Select.css'
export default function Select(props){
    return (
        <div>
        <label className="form-label" htmlFor={props.name}>{props.label}</label>
        <select className="form-select" name={props.name} id={props.name} value={props.value} onChange={props.onChange} >
            <option  disabled></option>
            {props.values.map(value=>{
                return <option value={value} key={value}>{value}</option>
            })}
        </select>{/*Print Validation errors           */}
        <p className="error">{props.error}</p>
        </div>

    )
}