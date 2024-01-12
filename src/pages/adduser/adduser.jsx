import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';

export default function AddUser() {
    // State
    const [newUser, setNewUser] = useState({firstname:"", lastname:"", email: "", password:""});
    const navigate = useNavigate();
    
    // Behavior
    const handleChange = (event) => {
        setNewUser({...newUser, [event.target.name]: event.target.value})
    }


    const handleSubmit = (event) => {
        event.preventDefault();
        // handleAdd(newUser);
        axios.post('http://localhost:3030/user', newUser)
            .then((response) => {
                setNewUser({firstname:"", lastname:"", email: "", password:""});
                console.log(response);
                navigate(`/`)
            })
    }

    
    // Render
    return (
        <div className="general-container">
            <form className='add-user'>
                <label htmlFor="#input-firstname">Titre*</label>
                <input 
                    id='input-firstname'
                    type="text"
                    placeholder="Prénom"
                    name="firstname"
                    value={newUser.firstname} 
                    onChange={handleChange}
                />
                <label htmlFor="#input-lastname">Titre*</label>
                <input 
                    id='input-lastname'
                    type="text"
                    placeholder="Nom"
                    name="lastname"
                    value={newUser.lastname} 
                    onChange={handleChange}
                />
                <label htmlFor="#input-email">Titre*</label>
                <input 
                    id='input-email'
                    type="mail"
                    placeholder="Email"
                    name="email"
                    value={newUser.email} 
                    onChange={handleChange}
                />
                <label htmlFor="#input-password">Titre*</label>
                <input 
                    id='input-password'
                    type="password"
                    placeholder="Mot de passe"
                    name="password"
                    onChange={handleChange}
                />
                <button onClick={(event) => {handleSubmit(event)}}>Ajouter</button>
            </form>
        </div>
    )
}