import React, {useState} from "react";
import "./UserRegister.css"
import PageTitle from "../PageTitle";

import PersonalAccountRegister from "../PersonalAccountRegister";
import SellerAccountRegister from "../SellerAccountRegister";
import SideImage from "../SideImage";

//Component to handle Registration
function UserRegister({setRegister}){
    const[isSubmitted,setIsSubmitted] = useState(false);
    const[accountType,setAccountType] = useState("Personal Account");

    function selectAccount(e){
        setAccountType(e.target.value);
    }

    function submitForm(){
        setIsSubmitted(true);
        setRegister();
    }
    return(
        <div className="user-register">
         <SideImage/>
            <div className="user-register-body">
                <PageTitle title="REGISTRATION INFORMATION"/>
                    <div className="register-form">
                        {accountType !== "Seller Account" ?
                            <PersonalAccountRegister callback={submitForm} onSelect={selectAccount} /> :
                            <SellerAccountRegister  callback={submitForm} onSelect={selectAccount} />
                        }
                    </div>
            </div>
        </div>
    )
}
export default UserRegister;