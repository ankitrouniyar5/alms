import React ,{useState, useEffect }from 'react'
import axios from 'axios';
import {Link, useHistory } from 'react-router-dom'
import { withStyles, makeStyles } from '@material-ui/core/styles';
import HashLoader from "react-spinners/HashLoader";

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import AddIcon from '@material-ui/icons/Add';



export default function DashBoard() {
    
    const history = useHistory()
    const [loading, setLoading] = useState(true);
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

        setLoading(true);
        getBranchList();
        getTotalNotification();
        getUnreadNotification();
        setLoading(false);
    },[]);
    
    const StyledTableCell = withStyles((theme) => ({
        head: {
          backgroundColor: theme.palette.common.black,
          color: theme.palette.common.white,
        },
        body: {
          fontSize: 14,
        },
      }))(TableCell);
      
      const StyledTableRow = withStyles((theme) => ({
        root: {
          '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
          },
        },
      }))(TableRow);

      const useStyles = makeStyles({
        table: {
          minWidth: 700,
        },
      });

      const classes = useStyles();

    
    return (
    
            <div >
            {
                loading ? 
                <div style = {{display : 'flex' , justifyContent : 'center'}}>
                    <HashLoader loading={loading} size={250} />
                </div>
                : 
                <>
                <div className = "Notification-box">
                    <span> Total Notification : {totalNotification }</span>
                    <br />
                    <span> Total Unread Notification : { unreadNotification }</span>
                    <div>
                        <Link to = "/add">Add a new Branch </Link>
                    </div>
                </div>
               
            <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="customized table">
                <TableHead>
                    <TableRow>
                        <StyledTableCell>S.N.</StyledTableCell>
                        <StyledTableCell align="left">Branch Name</StyledTableCell>
                        <StyledTableCell align="left">Edit</StyledTableCell>
                        <StyledTableCell align="left">Delete</StyledTableCell>
                    </TableRow>
        </TableHead>
        <TableBody>

            {
                branchList.map((branch,index)=>{
                    return (
                        <StyledTableRow key={index}>        
                            <StyledTableCell align="left">{index + 1}</StyledTableCell>
                            <StyledTableCell align="left">{branch.Branch_Name}</StyledTableCell>
                            <StyledTableCell align="left">
                                <span  onClick = {(e)=>{editBranch(e,branch.Branch_Name)}} className= "btn btn-primary">Edit </span>
                            </StyledTableCell>
                            <StyledTableCell align="left">
                            {
                                branch.Branch_Name !== "admin" && 
                                <span className = "btn btn-danger" onClick = {(e)=>{deleteBranch(e,branch.Branch_Name)}}>Delete</span>
                                
                            }
                            </StyledTableCell>
                        </StyledTableRow>    
                    )
                })
            }
            </TableBody>
            </Table>
            </TableContainer>
            </>
            }
            </div>
           
           
            
    )
}
