import React from 'react'
import {Route , Redirect} from 'react-router-dom'

export default function AdminRoute({isAdmin : isAdmin , component : Component , ...rest}) {
    return (
       <Route {...rest} render = {(props)=>{
           if(isAdmin){
               return <Component />
           }else{
               return( 
                    <Redirect to ={{ pathname : "/"  , state : {from : props.location}}} />
               );
           
           }
       }}/>
    )
}
