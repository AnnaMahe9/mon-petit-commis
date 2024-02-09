import React, { useLayoutEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import './signup.css';
import { Button, TextField } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { styled } from '@mui/material/styles';

export default function SignUp({ setShowNavbar }) {
    // State
    const [newUser, setNewUser] = useState({firstname:"", lastname:"", email: "", password:"", photoPath: ""});
    const [imageSelected, setImageSelected] = useState("");
    const navigate = useNavigate();
    
    const VisuallyHiddenInput = styled('input')({
        clip: 'rect(0 0 0 0)',
        clipPath: 'inset(50%)',
        height: 1,
        overflow: 'hidden',
        position: 'absolute',
        bottom: 0,
        left: 0,
        whiteSpace: 'nowrap',
        width: 1,
    });

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
                <TextField
                    required
                    id="outlined-required"
                    name="firstname"
                    label="prénom"
                    defaultValue="Prénom"
                    value={newUser.firstname} 
                    onChange={handleChange}
                />
                <TextField
                    required
                    id="outlined-required"
                    name="lastname"
                    label="Nom"
                    defaultValue="Nom"
                    value={newUser.lastname} 
                    onChange={handleChange}
                />
                <TextField
                    required
                    id="outlined-required"
                    name="email"
                    label="Email"
                    defaultValue="Email"
                    value={newUser.email} 
                    onChange={handleChange}
                />
                <TextField
                    id="outlined-password-input"
                    name="password"
                    label="Password"
                    type="password"
                    autoComplete="current-password"
                    onChange={handleChange}
                />
                <Button component="label" variant="contained" startIcon={<CloudUploadIcon />} onChange={(event) => setImageSelected(event.target.files[0])}>
                    Photo
                    <VisuallyHiddenInput type="file" />
                </Button>

                <div>
                    <hr />
                    <Button component="label" variant="contained" onClick={(event) => {handleSubmit(event)}}>
                        S'inscrire
                    </Button>
                </div>
            </form>
        </div>
    )
}