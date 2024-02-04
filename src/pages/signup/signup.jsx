import React, { useLayoutEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import './signup.css';

export default function SignUp({ setShowNavbar }) {
    // State
    const [newUser, setNewUser] = useState({firstname:"", lastname:"", email: "", password:"", photoPath: ""});
    const [imageSelected, setImageSelected] = useState("");
    const navigate = useNavigate();

    // Behavior
    useLayoutEffect(() => {
        setShowNavbar(false);
    }, [])

    const handleChange = (event) => {
        setNewUser({...newUser, [event.target.name]: event.target.value})
    }


    const handleSubmit = (event) => {
        event.preventDefault();
        axios.post('http://localhost:3030/user', newUser)
            .then((response) => {
                const formData = new FormData();
                const userId = response.data.id;
                formData.append("file", imageSelected)
                formData.append("folder", userId)
                formData.append("upload_preset", "vdwpz1pj")
                

                axios.post('https://api.cloudinary.com/v1_1/dppjibpjb/image/upload', formData)
                    .then((response) => {
                    newUser.photoPath = response.data.public_id;
                    console.log(newUser);
                    axios.patch(`http://localhost:3030/user/${userId}`, newUser)
                        .then((response) => {
                            setNewUser({firstname:"", lastname:"", email: "", password:"", photoPath: ""});
                            navigate(`/login`);
                        })
                    }
                )
            })
    }

    
    // Render
    return (
        <div className="general-container">
            <form className='add-user'>
                <div className='user-names'>
                    <label htmlFor="#input-firstname">Prénom*</label>
                    <input 
                        id='input-firstname'
                        type="text"
                        placeholder="Prénom"
                        name="firstname"
                        value={newUser.firstname} 
                        onChange={handleChange}
                        />
                    <label htmlFor="#input-lastname">Nom*</label>
                    <input 
                        id='input-lastname'
                        type="text"
                        placeholder="Nom"
                        name="lastname"
                        value={newUser.lastname} 
                        onChange={handleChange}
                        />
                </div>

                <div className='user-infos'>
                    <label htmlFor="#input-email">Email*</label>
                    <input 
                        id='input-email'
                        type="mail"
                        placeholder="Email"
                        name="email"
                        value={newUser.email} 
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

                <div>
                    <label htmlFor="#input-photo">Photo</label>
                    <input 
                    type="file"
                    onChange={(event) => setImageSelected(event.target.files[0])}
                    />
                </div>
                <div className='user-validation'>
                    <button onClick={(event) => {handleSubmit(event)}}>Ajouter</button>
                </div>
            </form>
        </div>
    )
}