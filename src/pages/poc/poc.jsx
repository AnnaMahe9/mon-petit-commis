import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import './poc.css'
import axios from 'axios'

export default function Poc() {
    //State
   const [imageSelected, setImageSelected] = useState("");

 
  const uploadImage = () => {
    const formData = new FormData();
    formData.append("file", imageSelected)
    formData.append("upload_preset", "vdwpz1pj")

    axios.post('https://api.cloudinary.com/v1_1/dppjibpjb/image/upload', formData)
        .then((response) => {
          console.log(response)
          setImageSelected("")
        }
    )
  }

  // Render
    return(
        <div>
            <input 
                type="file"
                onChange={(event) => {setImageSelected(event.target.files[0])}}
                />
            <button onClick={uploadImage()}>Upload Image</button>
        </div>
    )
}