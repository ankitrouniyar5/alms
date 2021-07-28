import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.css';
import axios from "axios";
import { useHistory } from 'react-router';

function Home() {

    const history = useHistory();
    const [pincode , setPincode] = useState("");
    const [phoneNumber , setPhoneNumber] = useState("");
    const [address, setAddress] = useState("");
    
   async function getBranches(e){
        e.preventDefault();
        try {
            const branchData ={
                pincode,
                phone : phoneNumber,
                address
            }
        
            const branchesRes = await axios.post("/branches",branchData);
            const branchesData = branchesRes.data;
            
            history.push({
                pathname : '/branches',
                state : branchesData
            })
        } catch (error) {
            console.log(error);
        }
   }

    return (
        <div className = "container">
            <div className = "welcome">
                <h1>Welcome to BNS.</h1>
            </div>
            <div className = "form-div">
                <form onSubmit={getBranches}>
                <div className = "form-group">
                    <label >Pincode</label> 
                    <input 
                        type = "text" 
                        placeholder = "pincode"
                        id = "pincode"
                        onChange =  {(e)=>{setPincode(e.target.value)}}
                        value = {pincode}
                        required 
                        className = "form-control"
                    />
                </div>    
                <div className = "form-group">
                    <label >Phone Number</label> 
                      <input 
                        type = "text" 
                        placeholder = "Phone Number"
                        id = "phoneNumber"
                        onChange =  {(e)=>{setPhoneNumber(e.target.value)}}
                        value = {phoneNumber}
                        required 
                        className = "form-control"
                    />
                </div>    
                <div className = "form-group">
                    <label>Address</label> 
                      <input 
                        type = "text" 
                        placeholder = "Address"
                        id = "pincode"
                        onChange = {(e)=>{setAddress(e.target.value)}}
                        value = {address}
                        required 
                        className = "form-control"
                    />
                </div>
                <button type = "submit" className="btn btn-primary">submit</button>
                </form>
            </div>
        </div>
    )
}

export default Home;