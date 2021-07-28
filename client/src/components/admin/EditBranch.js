import React ,{useState, useEffect }from 'react'
import axios from 'axios';
import {Link } from 'react-router-dom'
import { useHistory } from 'react-router';
import 'bootstrap/dist/css/bootstrap.css';


export default function EditBranch({match}) {
    
    const history = useHistory();

    const [Branch_Name , setBranch_Name ] = useState("");
    const [address , setAddress ] = useState("");
    const [city , setCity] = useState("");
    const [phoneNumber , setPhoneNumber ] = useState("");
    const [BranchIncharge , setBranchIncharge ] = useState("");
    const [username , setUserName ] = useState("");
    const [password , setPassword ] = useState("");
    var   [pincodes , setPincodes ] = useState([]);
    const [pin , setPin ] = useState("");


    useEffect(()=>{
        getBranchData(); 
        // console.log(branchData);
     },[])

    async function getBranchData(){
        try {
            
            const branch = await axios.get(`/admin/branches/${match.params.name}`)
         
            setAddress(branch.data[0].Address);
            setBranch_Name(branch.data[0].Branch_Name);
            setCity(branch.data[0].City);
            setPhoneNumber(branch.data[0].Contact_Number);
            setBranchIncharge(branch.data[0].Branch_Incharge);
            setUserName(branch.data[0].username);
            setPincodes(branch.data[0].pincodes);

        } catch (error) {
            console.log(error);
        }
    } 

    const addPinCode = (e) => {
        e.preventDefault();
        if(pin !== "")
            setPincodes( arr => [...arr, `${pin}`]);
    };

    const deletePin = (e,p) => {
        e.preventDefault();
        setPincodes(pincodes.filter((i,index)=>(index !== p)))
    }
    
    function renderPins(){
       return pincodes.map((p,index)=>{
            return <li key = {index} >{p} <button onClick = {(e)=>{deletePin(e,index)}}>Remove</button></li>
        })
    }

    async function updateBranch(e){
        
        e.preventDefault();
        try {
            const branchData ={
                Branch_Name,
                Address : address,
                City : city,
                Contact_Number : phoneNumber,
                Branch_Incharge : BranchIncharge,
                username,
                password,
                pincodes
            }
        
            const branchesRes = await axios.put(`/admin/branches/${match.params.name}`,branchData);
            alert("Branch Updated!!")
            // const branchesData = branchesRes.data;
            // console.log(branchesRes.data);
            
            history.push({
                pathname : '/dashboard'
            })
        } catch (error) {
            alert(error);
        }

    }

    
    return (
    
         <div>
        {
             <Link to = '/dashboard'>Dash Board</Link>
         }
            <div className = "add-branch-form">
                <form onSubmit={(e)=>{updateBranch(e)}}>
                <div className = "form-group">
                    <label >Branch Name </label> 
                    <input 
                        type = "text" 
                        placeholder = "Branch_Name"
                        id = "Branch_Name"
                        onChange =  {(e)=>{setBranch_Name(e.target.value)}}
                        value = {Branch_Name}
                        required 
                        className = "form-control"
                    />
                </div> 
                <div className = "form-group">
                    <label >Address</label> 
                      <input 
                        type = "text" 
                        placeholder = "Address"
                        id = "address"
                        onChange =  {(e)=>{setAddress(e.target.value)}}
                        value = {address}
                        required 
                        className = "form-control"
                    />
                </div>   
                <div className = "form-group">
                    <label >City : </label> 
                      <input 
                        type = "text" 
                        placeholder = "City"
                        id = "city"
                        onChange =  {(e)=>{setCity(e.target.value)}}
                        value = {city}
                        required 
                        className = "form-control"
                    />
                </div>
                <div className = "form-group">
                    <label >Contact Number</label> 
                      <input 
                        type = "text" 
                        placeholder = "Contact Number"
                        id = "phoneNumber"
                        onChange =  {(e)=>{setPhoneNumber(e.target.value)}}
                        value = {phoneNumber}
                        required 
                        className = "form-control"
                    />
                </div>    
                <div className = "form-group">
                    <label>Branch Incharge</label> 
                      <input 
                        type = "text" 
                        placeholder = "Branch Incharge"
                        id = "pincode"
                        onChange = {(e)=>{setBranchIncharge(e.target.value)}}
                        value = {BranchIncharge}
                        required 
                        className = "form-control"
                    />
                </div>
                <div className = "form-group">
                    <label>User Name</label> 
                      <input 
                        type = "text" 
                        placeholder = "User Name"
                        id = "username"
                        onChange = {(e)=>{setUserName(e.target.value)}}
                        value = {username}
                        required 
                        className = "form-control"
                    />
                </div>
                <div className = "form-group">
                    <label>Password</label> 
                      <input 
                        type = "text" 
                        placeholder = "Password"
                        id = "password"
                        onChange = {(e)=>{setPassword(e.target.value)}}
                        value = {password}
                        className = "form-control"
                    />
                </div>
                <div className = "">
                {
                    renderPins()
                }
                </div>
                <div className = "form-group">
                    <label>Pincodes</label> 
                      <input 
                        type = "text" 
                        placeholder = "Pincode"
                        id = "pin"
                        onChange = {(e)=>{setPin(e.target.value)}}
                        value = {pin}
                        className = "form-control"
                    />
                </div>
                <button className="btn btn-primary" onClick={ addPinCode } >Add Pin</button>
                <br /><br />
                <button type = "submit" className="btn btn-primary">submit</button>
                </form>
            </div>

    
        </div>
    )
}

    
  
