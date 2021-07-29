import React  from 'react'
import {BrowserRouter , Switch, Route } from 'react-router-dom'
import LoginForm from "./components/Login"
import Navbar  from "./components/layouts/Navbar"
import Footer from "./components/layouts/Footer"
import Home from './components/Home';

import axios from 'axios'
import Branches from './components/branchesInformation/Branches';
import Notification from './components/notifications/Notifications';
import DashBoard from './components/admin/DashBoard';
import AddBranch from './components/admin/AddBranch';
import EditBranch from './components/admin/EditBranch';
import AdminRoute from './components/admin/AdminRoute';
import UserRoute from './components/admin/UserRoute';

axios.defaults.withCredentials = true;

function Router(){

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
                
                <Route path="/notifications" >
                    <UserRoute component = { Notification } />
                </Route>

                
                <Route path ="/branches" component = { Branches } ></Route>  
    
            </Switch>
            <Route exact path = "/dashboard" >
                <AdminRoute component = {DashBoard} />
            </Route>   
            <Route exact path = "/add" >
                <AdminRoute component= { AddBranch } />
            </Route> 
            <Route exact path = "/edit/:name" >
                <AdminRoute component= { EditBranch } />
            </Route> 

         
              
                


        <Footer />
        </BrowserRouter>


    );
}

export default Router; 
