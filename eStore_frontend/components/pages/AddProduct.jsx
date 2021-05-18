import React, {useEffect, useState} from "react";
import {Card, CardContent, CardHeader, Grid} from "@material-ui/core";
import {Link} from "react-router-dom";
import Button from "../Button";
import Input from "../Input";
import Select from "../Select";
import FileUpload from "../FileUpload";
import validate from "../validateInfo";

//Url to submit the form
const url = "http://localhost:8280/estore?service=products";

//Add Product Component
const AddProduct = props => {
    //State to maintain Values
    const [values, setValues] = useState({
        name: "",
        category: "Mobile Phones",
        description: "",
        brand: "",
        sku: "",
        price: "",
        qty: "",
        img: ""
    });
    //State to maintain errors
    const [errors, setErrors] = useState({});
    //State to maintain submission status
    const [isSubmitting, setIsSubmitting] = useState(false);
    //State to store product image
    const [image,setImage] = useState();

    //This method is used to update values state whenever a change is occured in an input box
    const handleChange = event => {
        let {name, value} = event.target;
        //Validate price and qty
        if (name === "price" || name === "qty") {
            let result = parseInt(value);
            value = !isNaN(result) ? result : value;
        }

        setValues({...values, [name]: value})
    }
    //handle Form Submit
    const handleSubmit = event => {
        event.preventDefault();
        setErrors(validate(values));
        setIsSubmitting(true);
    }

    useEffect(() => {
        //Check if there are any errors
        if(Object.keys(errors).length === 0 && isSubmitting) {
            submitForm();
        }
    }, [errors])
    //Method that handles form submit
    const submitForm = () => {
        //Create a formData object
        const data = new FormData();
        //Add values and image to the data object
        data.append('values',JSON.stringify(values));
        data.append('image',image);

        //Sends a POST request to the backend with the Product details
        fetch(url, {
            headers: {
                "x-access-token":localStorage.getItem("token")
            },
            method: "POST",
            body: data
        }).then(res => res.json())
            .then(data => {
                props.toProducts();
            })
            .catch(err => console.error(err))
    }
    //Method that executes when an image is selected
    const addImg = img => {
        const {file} = img;
        setImage(file)
        setValues({...values, img: file.name});
    }

    return (
        <Card variant="outlined" className={props.styles.cardContainer}>
            <CardHeader
                title="Add Product"
                action={
                    <Link to="/products">
                        <Button
                            name="All Products"
                            btnStyle="btn-login"
                        />
                    </Link>
                }
                classes={{action: props.styles.action}}
            />
            <hr className={props.styles.hr} />

            <CardContent>
                <form onSubmit={handleSubmit}>
                    <Grid container spacing={2} justify="center">
                        <Grid item xs={12} md={6}>
                            <Input
                                label="Name" type="text" value={values.name}
                                id="name" name="name"
                                onChange={handleChange} error={errors["name"]}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Select
                                label="Category" type="select" value={values.category}
                                id="category" name="category"
                                values={["Mobile Phones", "Laptops", "TVs", "Headphones"]}
                                onChange={handleChange} error={errors["category"]}
                            />
                        </Grid>
                        <Grid item md={12}>
                            <label
                                htmlFor="description"
                                className="form-label"
                                style={{float: "left"}}
                            >
                                Description
                            </label>
                            <textarea
                                value={values.description} id="description"
                                name="description" rows={5}
                                onChange={handleChange} className="input-box"
                            />
                            <p className="error">{errors["description"]}</p>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Input
                                label="Brand" type="text" value={values.brand}
                                id="brand" name="brand"
                                onChange={handleChange} error={errors["brand"]}
                            />
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <Input
                                label="SKU" type="text" value={values.sku}
                                id="sku" name="sku"
                                onChange={handleChange} error={errors["sku"]}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Input
                                label="Price" type="text" value={values.price}
                                id="price" name="price"
                                onChange={handleChange} error={errors["price"]}
                            />
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <Input
                                label="Qty" type="text" value={values.qty}
                                id="qty" name="qty"
                                onChange={handleChange} error={errors["qty"]}
                            />
                        </Grid>
                        <Grid item md={12}>
                            <FileUpload callback={addImg} />
                        </Grid>
                    </Grid>
                    <div style={{marginBlock: "24px", float: "right"}}>
                        <Button name="Save" btnStyle="btn-save" type="submit" />
                        <Button name="Cancel" btnStyle="btn-cancel" type="button" onclick={() => props.toProducts()} />
                    </div>
                </form>
            </CardContent>
        </Card>
    )
}

export default AddProduct;