import React from "react";
import Grid from "@material-ui/core/Grid";
import Select from "./Select";
import Input from "./Input";
import useForm from "./useForm";
import validate from "./validateInfo";
import Button from "./Button";
import RadioButton from "./Radio";
import {useEffect} from "react";

const btnStyle={
    marginTop:30,
    marginBottom:10,
    width:"100%",
    textAlign:"right",
}
const btnTop={
    position: "absolute",
    top: 146,
    right: 35
}

function Form(props){
    const url = props.url;
    const inputs = props.inputs;
    const names = props.names;
    const callback = props.callback;
    const buttons = props.btns;

    //Import methods from useForm hook
    const {handleChange, handleSubmit, values, errors } = useForm(callback,validate,names,url);



    return(
        <div>
            <form onSubmit={handleSubmit} >
                <Grid container spacing={2} justify="center">
                    {
                        //Map input array to input components
                        inputs.map(input=>{
                            if(input.type==="select"){
                                return <Grid item xs={12} md={6} key={input.name}>
                                    <Select name={input.name} label={input.label} values={input.values} value={values[input.name]} onChange={handleChange}
                                            error={errors[input.name] ? errors[input.name] : ''} />
                                </Grid>
                            }else if(input.type==="radio-full"){
                                return <Grid item xs={12} md={12} key={input.name}>
                                    <RadioButton label={input.label} value={values[input.name]} values={input.values}
                                                 id={input.name} name={input.name} onChange={(e)=>{handleChange(e);input.onSelect(e);}}
                                                 error={errors[input.name] ? errors[input.name] : ''} />
                                </Grid>
                            }else if(input.type==="radio"){
                                return <Grid item xs={12} md={6} key={input.name}>
                                    <RadioButton label={input.label} value={values[input.name]} values={input.values}
                                           id={input.name} name={input.name} onChange={handleChange}
                                           error={errors[input.name] ? errors[input.name] : ''} />
                                </Grid>
                            }else {
                                return <Grid item xs={12} md={6} key={input.name}>
                                    <Input label={input.label} value={values[input.name]} type={input.type}
                                           id={input.name} name={input.name} onChange={handleChange} placeholder={input.placeholder}
                                           error={errors[input.name] ? errors[input.name] : ''} maxLength={input.maxLength}/>
                                </Grid>
                            }
                        })
                    }
                </Grid>
                <div style={props.btnstyle==='top'? btnTop:btnStyle}>
                    {
                        buttons.map(btn => {
                            return <Button btnStyle={btn.style} name={btn.name} onclick={btn.onclick} type={btn.type} key={btn.name}/>
                        })
                    }
                </div>
            </form>


        </div>
    )
}
export default Form;