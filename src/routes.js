import React from 'react'; 
import {  BrowserRouter, Route, Switch } from 'react-router-dom';
import SignUp from './pages/signup';
import SignIn from './pages/signin';
import DashBoard from './pages/dashboard';
import ShowProduct from './components/ShowProduct';
import AddProduct from './components/AddProduct';
import MyProduct from './components/MyProduct';
import SearchProduct from './components/SearchProduct';
import MyCart from './components/MyCart';
import MyBit from './components/MyBit';
import UpdateProduct from './components/UpdateProduct';

const Routes = () =>{
    return(
        <BrowserRouter>
            <Switch>
                <Route exact path = "/" component = { SignIn } />
                <Route path = "/signin" component = { SignIn } />
                <Route path = "/signup" component = { SignUp } />
                <Route path = "/dashboard" component = { DashBoard } />
                <Route path = "/showproduct/:id" component = { ShowProduct }/>
                <Route path = "/addproduct" component = { AddProduct }/>
                <Route path = "/myproduct" component= { MyProduct } />
                <Route path = "/searchproduct" component = { SearchProduct } />
                <Route path = "/mycart" component = { MyCart } />
                <Route path = "/mybit" component = { MyBit } />
                <Route path = "/updateproduct/:id" component= {UpdateProduct} />
            </Switch>
        </BrowserRouter>
    )
}

export default Routes;