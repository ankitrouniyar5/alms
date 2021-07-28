import React ,{useContext} from 'react'
import {BrowserRouter , Switch, Route } from 'react-router-dom'
import LoginForm from "./components/Login"
import Navbar  from "./components/layouts/Navbar"
import AuthContext from './components/context/AuthContext';
import Footer from "./components/layouts/Footer"
import Home from './components/Home';

import axios from 'axios'
import Branches from './components/branchesInformation/Branches';
import Notification from './components/notifications/Notifications';
import DashBoard from './components/admin/DashBoard';
import AddBranch from './components/admin/AddBranch';
import EditBranch from './components/admin/EditBranch';


axios.defaults.withCredentials = true;

function Router(){

    const { loggedIn }= useContext(AuthContext);

    return (

        <BrowserRouter >
        <Navbar />
            <Switch>
                <Route exact path="/">
                    <Home />
                </Route>
                <Route path="/login">
                    <LoginForm />
                </Route>
                {loggedIn === true  && 
                    <>
                    <Route path="/notifications" component = { Notification }></Route>
                    </> }
                <Route path ="/branches" component = { Branches } ></Route>  
               
            </Switch>
            <Route path = "/dashboard" component = {DashBoard} ></Route>  
            <Route path = "/add" exact component = {AddBranch}></Route>  
            <Route path = "/edit/:name" component = {EditBranch}></Route>  

        <Footer />
        </BrowserRouter>


    );
}

export default Router; 
