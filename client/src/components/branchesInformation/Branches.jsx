import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import BusinessIcon from '@material-ui/icons/Business';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import PhoneIcon from '@material-ui/icons/Phone';
import io from "socket.io-client";


let socket;
export default function Branches(props) {

    socket = io();
    const [userToNotify] = useState([]);

    useEffect(()=>{
        socket.emit('sendNotification', userToNotify);

        return socket.off();
    },[props.history.location , userToNotify])
   
    function renderBranches(){

        const data = props.history.location.state;
        
        data.forEach(d => {
            userToNotify.push(d.username);
        });
        if (data.length === 0) return (
            <div className = "no-branches-message">
            <h1 className = "">Sorry!!! 😢</h1>
            <p>Beetle Nut Solutions is not in the given area.</p>
            <p><Link to="/">Try another pin</Link></p>
            </div>
        ) 
        
        return data.map((d,index)=>{
            return (
                <div className = "note">
            <div key={index} className="mt-2">
                <b>Branch Name: </b>{d.Branch_Name}<br /><br />
               <BusinessIcon /> <b>Address :</b>{d.Address}, {d.City} <br />
                <SupervisorAccountIcon /><b>Branch Incharge:</b>{d.Branch_Incharge}<br />
                <PhoneIcon /><b>Contact Number : </b>{d.Contact_Number}
            </div>
            </div>
            );
        })
    }

    return (
        <div className = "container">
            <div className ="row">
                    {renderBranches()}  
            </div>
        </div>
    )
}
