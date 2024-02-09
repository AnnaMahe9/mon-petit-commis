import React, { useLayoutEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import './login.css';
import { Button, TextField } from '@mui/material';

export default function Login({ setShowNavbar }) {
    // State
    const [user, setUser] = useState({email: "", password:""});
    const navigate = useNavigate();

    // Behavior
    useLayoutEffect(() => {
        setShowNavbar(false);
    }, [])

    const handleChange = (event) => {
        setUser({...user, [event.target.name]: event.target.value})
    }


    const handleSubmit = (event) => {
        event.preventDefault();
        axios.post('http://localhost:3030/user/login', {email: user.email, password: user.password})
            .then((response) => {
                console.log(response);
                localStorage.setItem("accessToken", response.data.access_token);
                setUser({email: "", password:""});
                navigate('/');
            })
    }

    
    // Render
    return (
        <div className="general-container">
            <form className='log-user'>
                <TextField
                    required
                    id="outlined-required"
                    name="email"
                    label="Email"
                    margin='normal'
                    defaultValue="Email"
                    value={user.email} 
                    onChange={handleChange}
                />
                <TextField
                    required
                    id="outlined-password-input"
                    name="password"
                    label="Password"
                    type="password"
                    margin='normal'
                    autoComplete="current-password"
                    onChange={handleChange}
                />
                    

                <div id='login-div'>
                    <hr />
                    <Button id='login-button' component="label" variant="contained" color='primary' onClick={(event) => {handleSubmit(event)}}>
                        Se connecter
                    </Button>
                </div>
            </form>
        </div>
    )
}