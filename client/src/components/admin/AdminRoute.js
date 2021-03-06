import React  ,{ useEffect }from 'react'
import {Route , useHistory} from 'react-router-dom'
import axios from 'axios'

export default function AdminRoute(props) {


    const history = useHistory();

    async function isAdmin(){
        const is = await axios.get('/admin/isAdmin');
        if(!is.data){
            history.push("/login");
        }
    }

    useEffect(()=>{
        isAdmin();
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
