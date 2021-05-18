export default function validateInfo(values){

    let errors = {};

    //Validate First name
    if(values.hasOwnProperty("fname")) {
        if (!values.fname.trim()) {
            errors.fname = "Please enter a First name";
        }
    }
    //Validate Last name
    if(values.hasOwnProperty("lname")) {
        if (!values.lname.trim()) {
            errors.lname = "Please enter a Last name";
        }
    }
    //Validate email
    if(values.hasOwnProperty("email")) {
        if (!values.email) {
            errors.email = 'Please enter an email';
        } else if (!/\S+@\S+\.\S+/.test(values.email)) {
            errors.email = 'Email address is invalid';
        }
    }

    //Validate Contact Number
    if(values.hasOwnProperty("contact")) {
        if (!values.contact.trim()) {
            errors.contact = "Please enter a Contact Number";
        }else if(! /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im.test(values.contact)){
            errors.contact = "Please enter a valid Contact Number";
        }
    }
    //Validate Address 1
    if(values.hasOwnProperty("address1")) {
        if (!values.address1.trim()) {
            errors.address1 = "Please enter your address";
        }
    }
    //Validate Address
    if(values.hasOwnProperty("address")) {
        if (!values.address.trim()) {
            errors.address = "Please enter your address";
        }
    }
    //Validate Business name
    if(values.hasOwnProperty("businessName")) {
        if (!values.businessName.trim()) {
            errors.businessName = "Please enter your Business Name";
        }
    }

    //Validate City
    if(values.hasOwnProperty("city")) {
        if (!values.city.trim()) {
            errors.city = "Please enter your city";
        }
    }

    //Validate State
    if(values.hasOwnProperty("state")) {
        if (!values.state.trim()) {
            errors.state = "Please enter your state";
        }
    }

    //Validate zipcode
    if(values.hasOwnProperty("zipcode")) {
        if (!values.zipcode.trim()) {
            errors.zipcode = "Please enter your zipcode";
        }
    }
    //Validate country
    if(values.hasOwnProperty("country")) {
        if (!values.country.trim()) {
            errors.country = "Please select your country";
        }
    }
    //Validate Mobile Number
    if(values.hasOwnProperty("mobile")) {
        if (!values.mobile.trim()) {
            errors.mobile = "Please enter a mobile Number";
        }else if(! /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im.test(values.mobile)){
            errors.mobile = "Please enter a valid mobile Number";
        }
    }




    //Validate Password
    if(values.hasOwnProperty("password")) {
        if (!values.password) {
            errors.password = 'Please enter a password';
        } else if (values.password.length < 8) {
            errors.password = 'Password needs to be 8 characters or more';
        }
    }
    //Validate Confirm Password
    if(values.hasOwnProperty("confirmPassword")) {
        if (!values.confirmPassword) {
            errors.confirmPassword = 'Password is required';
        } else if (values.confirmPassword !== values.password) {
            errors.confirmPassword = 'Passwords do not match';
        }
    }
    //Validate Card holder's name
    if(values.hasOwnProperty("chname")) {
        if (!values.chname.trim()) {
            errors.chname = "Please enter Card holder's name";
        }
    }
    //Validate Card number
    if(values.hasOwnProperty("cnum")) {

        if (!values.cnum.trim()) {
            errors.cnum = "Please enter a Card number";
        }else if(!/^[0-9]{4}\s*[0-9]{4}\s*[0-9]{4}\s*[0-9]{4}\s*$/.test(values.cnum)){
            errors.cnum = "Please enter a valid Card number";
        }
    }
    //Validate Card Expiry date
    if(values.hasOwnProperty("expiry")) {
        if (!values.expiry.trim()) {
            errors.expiry = "Please enter a expiry date";
        }else if(!/^[0-9]{2}[/][0-9]{2}$/.test(values.expiry)){
            errors.expiry = "Please enter a valid expiry date in the format mm/yy";
        }else{
            let date = values.expiry.split("/");
            let now = new Date();
            let currentMonth = now.getMonth()+1;
            let currentYear = parseInt(now.getFullYear().toString().substr(-2));
            const month = parseInt(date[0]);
            const year = parseInt(date[1]);
            // currentYear = parseInt(currentYear);

            if(month === 0 || month > 12 || year === 0 || year > currentYear+10){
                errors.expiry = "Please enter a valid expiry date";
            }
            if((year === currentYear && month <= currentMonth) || year < currentYear){
                errors.expiry = "Your card has already expired. Please try again with another card"
            }
        }
    }

    //Validate Card cvc code
    if(values.hasOwnProperty("cvc")) {
        if (!values.cvc.trim()) {
            errors.cvc = "Please enter a cvc code";
        }else if(!/^[0-9]{3}$/.test(values.cvc)){
            errors.cvc = "Please enter a valid cvc code";
        }
    }

    /* Product Validations */
    // Validate product name
    if(values.hasOwnProperty("name")) {
        if (!values.name.trim()) {
            errors.name = "Please enter a product name";
        }
    }
    // Validate brand
    if(values.hasOwnProperty("brand")) {
        if (!values.brand.trim()) {
            errors.brand = "Please enter a brand name";
        }
    }
    // Validate SKU
    if(values.hasOwnProperty("sku")) {
        if (!values.sku.trim()) {
            errors.sku = "Please enter an SKU";
        }
    }
    // Validate price
    if(values.hasOwnProperty("price")) {
        if (isNaN(values.price)) {
            errors.price = "Please enter a valid price";
        } else if (values.price <= 0) {
            errors.price = "Please enter a price";
        }
    }
    // Validate qty
    if(values.hasOwnProperty("qty")) {
        if (isNaN(values.qty)) {
            errors.qty = "Please enter a valid quantity";
        } else if (values.qty <= 0) {
            errors.qty = "Please enter a quantity";
        }
    }

    //Validate Pincode
    if(values.hasOwnProperty("pincode")) {
        if (!values.pincode.trim()) {
            errors.pincode = "Please enter a pin code";
        }else if(!/^[0-9]{4}$/.test(values.pincode)){
            errors.pincode = "Please enter a valid pin code";
        }
    }


    return errors;
}