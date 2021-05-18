import React, {useState} from 'react';
import './App.css'
import Header from "./components/Header";
import Cart from "./components/Cart";
import Home from "./components/pages/Home";
import Billing from "./components/pages/Billing";
import UserRegister from "./components/pages/UserRegister";
import {BrowserRouter as Router, Switch, Route,Redirect} from 'react-router-dom';
import Login from "./components/pages/Login";
import checkLogin from "./components/CheckLogin";
import SearchResult from "./components/pages/SearchResult";
import ProductsOrders from "./components/pages/ProductsOrders";



function App(){
    //State to maintain cart open and close
    const [isCartClicked,setIsCartClicked] = useState(false);
    //State to maintain login status
    const [loginStatus,setLoginStatus] = useState(checkLogin());
    //State to maintain Register Status
    const [registerStatus, setRegisterStatus] = useState(checkLogin());
    //State to store the products in the cart
    const [cartProducts,setCartProducts] = useState([]);

    //Function to toggle cart state
    function toggleCart(){
        setIsCartClicked(!isCartClicked);
    }

    //Function to add products to the cart
    function addToCart(product){
        //Set products in the cart
        setCartProducts(prevState => {
            //check if item is already in the cart
            const isItemInCart = prevState.find(item=>item._id === product._id)
            if(isItemInCart){
                return prevState.map(item=>{
                    //Increase the qty of the product by 1
                    return item._id===product._id?{...item,qty:item.qty+1}:item
                })
            }
            //If item is in not in cart add the product to the cart
            return [...prevState,{...product,qty:1}]
        })
    }
    //Update Product Quantity
    function updateQty(index,e){
        //Get the name and value from the target
        const {name,value} = e.target;
        //If qty=0 remove products from the cart
        if(value==0)removeProducts(name);
        //Update the quantity in the state
        setCartProducts(prevState => {
            return prevState.map(item=>{
                return item._id==name?{...item,qty:parseInt(value)}:item
            })
        })
    }
    //Remove Products from the Cart
    function removeProducts(id){
        //Remove Products from the Cart Products State
        setCartProducts(prevState => {
          return prevState.reduce((ack,item)=>{
                if (item._id==id) {
                    return ack;
                }else {
                    return [...ack, item];
                }
            },[])
        })
    }
    //Method to Calculate Total
    function calculateTotal(){
        let total =  cartProducts.reduce((ack,item)=>ack+item.price*item.qty,0);
        return total;
    }
    //Method to Logout
    function logout() {
        localStorage.removeItem("token");
        setLoginStatus(false)
    }

    function emptyCart(){
        setCartProducts([]);
    }


return(
    <Router>
    <div className='App'>

        <Header toggleCart={toggleCart} userType={loginStatus} logout={logout}/>
        {
            //Check if Cart is opened or closed
            isCartClicked?<Cart toggle={toggleCart} products={cartProducts} updateQty={updateQty} remove={removeProducts} total={calculateTotal}/>:""
        }
        <div className="main">
                {/*Switch Routes*/}
                <Switch>
                    <Route exact path="/">
                        <Home addToCart={addToCart}/>
                    </Route>
                    <Route exact path="/register">
                        {/*Check if registration is successful*/}
                        {!registerStatus?<UserRegister setRegister={()=>{setRegisterStatus(true)}}/>:<Redirect to={"/login"}/>}
                    </Route>
                    <Route exact path="/login">
                        {/*Check if login is successful*/}
                        {!loginStatus?<Login setLogin={(data)=>{setLoginStatus(data)}}/>:<Redirect to={"/"}/>}
                    </Route>
                    <Route exact path="/checkout">
                        <Billing cart={cartProducts} total={calculateTotal} clearCart={emptyCart} />
                    </Route>
                    <Route path="/search/:query">
                        <SearchResult addToCart={addToCart}/>
                    </Route>
                    <Route path="/products">
                        <ProductsOrders/>
                    </Route>

                </Switch>



        </div>



    </div>
    </Router>
)
}
export default App;