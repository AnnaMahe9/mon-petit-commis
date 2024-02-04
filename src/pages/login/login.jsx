import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import './login.css';

export default function Login() {
    // State
    const [user, setUser] = useState({email: "", password:""});
    const navigate = useNavigate();

    // Behavior
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
        <div className="">
            <form className='add-user'>
                <div className='user-infos'>
                    <label htmlFor="#input-email">Email*</label>
                    <input 
                        id='input-email'
                        type="mail"
                        placeholder="Email"
                        name="email"
                        value={user.email} 
                        onChange={handleChange}
                        />
                    <label htmlFor="#input-password">Mot de passe*</label>
                    <input 
                        id='input-password'
                        type="password"
                        placeholder="Mot de passe"
                        name="password"
                        onChange={handleChange}
                        />
                </div>

                <div className='user-validation'>
                    <button onClick={(event) => {handleSubmit(event)}}>Ajouter</button>
                </div>
            </form>
        </div>
    )
}