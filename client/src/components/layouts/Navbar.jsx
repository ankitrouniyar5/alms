import React ,{ useContext }from 'react'
import { Link } from 'react-router-dom'
import AuthContext from '../context/AuthContext';
import LogOutButton from './LogOutButton';

export default function Navbar() {

    
    const { loggedIn }= useContext(AuthContext);
   

    
    return (
        <div>   
            <nav className="navbar navbar-expand-lg navbar-custom static-top">
               
                    <a className = "navbar-brand" href="/"><h1>Beetle Nut Solutions</h1></a>
                    <div className = "navbar-nav ml-auto">
                    <span className = "nav-item nav-link"><Link to="/">Home </Link></span>
                    {
                        loggedIn === false && <span className = "nav-item nav-link"><Link to="/login">Login</Link></span>
                    
                    }
                    {
                        loggedIn === true && <span className = "nav-item nav-link"><LogOutButton /> </span>
                    }
                   
                    </div>
                
            </nav>
        </div>
    )
}

