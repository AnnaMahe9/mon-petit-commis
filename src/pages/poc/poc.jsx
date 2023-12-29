import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import './poc.css'
import axios from 'axios'

export default function Poc() {
    //State
   const [imageSelected, setImageSelected] = useState("");

 
  const uploadImage = (event) => {
    event.preventDefault();
    const formData = new FormData();
    const userId = '154241564';
    formData.append("file", imageSelected)
    formData.append("folder", userId)
    formData.append("upload_preset", "vdwpz1pj")
    

    axios.post('https://api.cloudinary.com/v1_1/dppjibpjb/image/upload', formData)
        .then((response) => {
          console.log(response)
        }
    )
  }

  // Render
    return(
        <div>
            <input 
                type="file"
                onChange={(event) => setImageSelected(event.target.files[0])}
                />
            <button onClick={(event) => {uploadImage(event)}}>Upload Image</button>
        </div>
    )
}