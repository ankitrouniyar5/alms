import React from "react";
import 'bootstrap/dist/css/bootstrap.css';
import Router from "../Router";
import { AuthContextProvider } from "./context/AuthContext";


const App = ()=>{
    return ( 
      <AuthContextProvider>     
        <Router />
      </AuthContextProvider>  
    );
}

export default App;