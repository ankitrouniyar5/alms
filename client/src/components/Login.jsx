import React , {useState ,useContext} from "react";
import 'bootstrap/dist/css/bootstrap.css';
import axios from 'axios';
import { useHistory } from 'react-router';
import AuthContext from "./context/AuthContext";
import LockOpenIcon from '@material-ui/icons/LockOpen';

import './styles.css'

function LoginForm() {

    
    const history = useHistory();
    const { getLoggedIn } = useContext(AuthContext)
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState('');

    async function login(e){

        e.preventDefault();

        try {
            const loginData = {
                username,
                password
            };
            const data = await axios.post(`/user/login`,loginData);
            if(data.status === 401) {
                setErrorMessage("Invalid username or password");
                history.push('/login');
            }else{
                await getLoggedIn();
                history.push(`/notifications?user=${username}`)
            }

        } catch (error) {
            setErrorMessage("Invalid User-Name or Password");
        }

    }


    return (
        <>
            <div className = "login-form">
            <form onSubmit = {login}>
            {errorMessage && 
                <div className="alert alert-warning alert-dismissible fade show" role="alert">
                    <strong>{errorMessage}</strong>
            </div>
            }
            <div className ="form-image"><LockOpenIcon /></div>
            <div className="form-group">
                <label >Username :</label>
                <input 
                    className="form-control"
                    type = "text" 
                    required 
                    onChange={(e)=>{setUsername(e.target.value)}} 
                    value = {username}
                />
            </div>
                <br></br>
             <div className = "form-group">
                <label>Password :</label>
                <input 
                    className="form-control" 
                    type = "password" 
                    required 
                    onChange={(e)=>{setPassword(e.target.value)}} 
                    value = {password}
                />
             </div>   
                <br></br>
                <button type = "submit" className="btn submit-btn">submit</button>
            </form>
            </div>
        </>
    )
}

export default LoginForm;