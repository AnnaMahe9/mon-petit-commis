import React, { useLayoutEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import './createrecipe.css'
import axios from 'axios'
import { Button, TextField } from "@mui/material";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { styled } from '@mui/material/styles';
import { jwtDecode } from "jwt-decode";


export default function CreateRecipe({ setShowNavbar }) {
    //State
    const userId = JSON.parse(jwtDecode(localStorage.getItem('accessToken')).id);
    const [recipes, setRecipes] = useState([])
    const [imageSelected, setImageSelected] = useState("");
    const [newRecipe, setNewRecipe] = useState({user: userId, title:"", link:"", photoPath: "", description:""});
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
      setShowNavbar(true);
  }, [])

  const handleChange = (event) => {
      setNewRecipe({...newRecipe, [event.target.name]: event.target.value})
  }


  const handleSubmit = (event) => {
      event.preventDefault();
      handleAdd(newRecipe);
      setNewRecipe({title:"", link:"", photoPath: "", description:""});
  }

  const handleAdd = (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("file", imageSelected)
    formData.append("folder", userId)
    formData.append("upload_preset", "vdwpz1pj")
    

    axios.post('https://api.cloudinary.com/v1_1/dppjibpjb/image/upload', formData)
        .then((response) => {
          console.log(response)
          console.log(response.data.public_id)
          newRecipe.photoPath = response.data.public_id;
      
          console.log("newRecipe", newRecipe);
          axios.post('http://localhost:3030/recipe', newRecipe)
            .then(data => {
              console.log(data)
              const recipesCopy = [...recipes]
              recipesCopy.push(data)
              setRecipes(recipesCopy)
              console.log(data.data.id)
              navigate(`/recipes/${data.data.id}`)
            },
            (error) => {
              console.error("Une erreur s'est produite lors de l'enregistrement de la recette", error)
            }
            )
        }
    )
  }

  // Render
    return(
        <div className="general-container">
            <h1>Ici on ajoute une recette</h1>
            <form className='add-form' action="submit" onSubmit={handleSubmit}>
                <TextField
                    required
                    id="outlined-required"
                    name="title"
                    label="title"
                    defaultValue="Entrez votre titre ici"
                    margin="normal"
                    value={newRecipe.title} 
                    onChange={handleChange}
                />
                <TextField
                    required
                    id="outlined-required"
                    name="link"
                    label="link"
                    defaultValue="Si vous en avez, ajoutez votre lien ici"
                    margin="normal"
                    value={newRecipe.link} 
                    onChange={handleChange}
                />
                <TextField
                    required
                    id="outlined-required"
                    name="description"
                    label="Description"
                    defaultValue="Si vous n'avez pas de lien, ajoutez votre recette ici"
                    margin="normal"
                    value={newRecipe.description} 
                    onChange={handleChange}
                />
                <Button id="add-photo-recipe-button" component="label" variant="contained" color='secondary' startIcon={<CloudUploadIcon />} onChange={(event) => setImageSelected(event.target.files[0])}>
                    Photo
                    <VisuallyHiddenInput type="file" />
                </Button>
                <div id='recipe-div'>
                    <hr />
                    <Button id="add-recipe-button" component="label" variant="contained" onClick={(event) => {handleAdd(event)}}>
                      Ajouter
                    </Button>
                </div>
            </form>
        </div>
    )
}