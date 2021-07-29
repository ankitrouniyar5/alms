import React  ,{ useEffect }from 'react'
import {Route , useHistory} from 'react-router-dom'
import axios from 'axios'

export default function UserRoute(props) {


    const history = useHistory();

    async function isUser(){
        const is = await axios.get('/user/isloggedin');
        if(!is.data){
            history.push("/login");
        }
    }

    useEffect(()=>{
        isUser();
    },[])

    const Component = props.component


   
    return (
       
        <Route {...props} 
            render = {(props)=>{
               <Component {...props} />
            }}
        />               
    )
}
