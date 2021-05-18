import React from 'react'

import './Button.css'

//Save and Cancel Button
function Button(props){
return(
        <button className={`btn ${props.btnStyle}`} onClick={props.onclick} type={props.type}>{props.name}</button>
)
}
export default Button;