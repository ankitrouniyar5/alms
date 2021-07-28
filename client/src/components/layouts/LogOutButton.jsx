import axios from 'axios'
import React, { useContext } from 'react'
import AuthContext from '../context/AuthContext'
import { useHistory } from 'react-router';

import 'bootstrap/dist/css/bootstrap.css';

export default function LogOutButton() {


    const history = useHistory();
    const { getLoggedIn } = useContext(AuthContext)
    async function logOut(){
        await axios.get("/user/logout")
        await getLoggedIn();
        history.push('/')
    }
    return (
        <div>
            <button className = "btn btn-primary"onClick = {logOut}>Log Out</button>
        </div>
    )
}
