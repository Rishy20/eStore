import React, {useState} from "react";
import SideImage from "../SideImage";
import PageTitle from "../PageTitle";
import Input from "../Input";
import "./Login.css"
import Button from "../Button";
import useForm from "../useForm";
import validate from "../validateInfo";

const names={
    email:'',
    password:''
}
//Login url
const url = "http://localhost:8280/estore?service=login"

//Login Component
function Login({setLogin}){

    //Import methods from useForm hook
    const {handleChange, handleSubmit, values, errors } = useForm(submitForm,validate,names,url);
    //Method to handle Submission State
    const[isSubmitted,setIsSubmitted] = useState(false);
    //method to display error message
    const [message,setMessage] = useState(null);
    //Variable to store user type
    let userType;
    function submitForm(data){
        setIsSubmitted(true);
        //Check if login is successful
        if(data.auth){
            userType = data.usertype;
            setLogin(userType);
            localStorage.setItem("token",data.token);
        }else{
            setMessage(data.message)
        }
    }
    return(
        <div className="user-login">
            <SideImage/>
            <div className="user-login-body">
                <PageTitle title="LOGIN"/>
                <div className="login-form">
                    <form onSubmit={handleSubmit}>
                    <Input type="email" name="email" label="Email" onChange={handleChange} value={values["email"]} error={errors["email"] ? errors["email"] : ''} />
                    <Input type="password" name="password" label="Password" onChange={handleChange} value={values["password"]} error={errors["password"] ? errors["password"] : ''}  />
                        {message?<div className="login-error">{message}</div>:null}
                    <Button btnStyle="btn-login" type="submit" name="SIGN IN"/>
                    </form>

                </div>
            </div>
        </div>
    )
}

export default Login;