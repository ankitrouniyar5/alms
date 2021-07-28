import React ,{useState, useEffect }from 'react'
import axios from 'axios';
import {Link, useHistory } from 'react-router-dom'
import Alert from 'react-bootstrap/Alert'


export default function DashBoard() {
    
    const history = useHistory()
    const [totalNotification, setTotalNotification] = useState(0);
    const [unreadNotification, setUnreadNotification] = useState(0);
    const [branchList , setBranchList] = useState([{}]);
    


    async function getBranchList(){

        try {
            const res = await axios.get(`/admin/branches`);
            setBranchList(res.data);
        
        } catch (error) {
            console.log(error)
        }
    }

    async function getTotalNotification(){

        try {
            const res = await axios.get(`/admin/notifications/count/all`);
            setTotalNotification(res.data);
            
        } catch (error) {
            console.log(error)
        }
    }

    async function getUnreadNotification(){

        try {
            const res = await axios.get(`/admin/notifications/count/read/all`);
            setUnreadNotification(res.data);
            
        } catch (error) {
            console.log(error)
        }
    }

    async function deleteBranch(e,name){

        // e.preventDefault();
        if(window.confirm(`Are you sure you want to delete ${name} ?`)){
            try {
                const res = await axios.delete(`/admin/branches/${name}`);
                alert("The branch was deleted sucessfully.");
                getBranchList();
                
            } catch (error) {
                console.log(error)
            }
        }
    }
    
    async function editBranch(e,name){

        try{
            history.push(`/edit/${name}`);
        }catch(error){
            console.log(error);
        }
    }
    
    useEffect(()=>{
        getBranchList();
        getTotalNotification();
        getUnreadNotification()
    },[]);
    


    
    return (
        <div>
            <div>
            <span> Total Notification : {totalNotification }</span>
            <br />
            <span> Total Unread Notification : { unreadNotification }</span>
            </div>
            <div>
                <Link to = "/add">Add a new Branch </Link>
            </div>
            {
                branchList.map((branch,index)=>{
                    return <div key = {index} ><li>{branch.Branch_Name} <button  onClick = {(e)=>{editBranch(e,branch.Branch_Name)}} className= "btn btn-primary my-1 mx-2">Edit </button>
                    <button className = "btn btn-danger my-1 mx-2" onClick = {(e)=>{deleteBranch(e,branch.Branch_Name)}}>Delete</button>
                    </li> </div>
                })
            }
        </div>
    )
}
