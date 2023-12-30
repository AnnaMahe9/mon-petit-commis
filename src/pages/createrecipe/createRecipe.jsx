import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import './createrecipe.css'
import axios from 'axios'


export default function CreateRecipe() {
    //State
    const [recipes, setRecipes] = useState([])
    const [imageSelected, setImageSelected] = useState("");
    const [newRecipe, setNewRecipe] = useState({title:"", link:"", photoPath: "", description:""});
    const navigate = useNavigate()

  // Behavior
    const handleChange = (event) => {
        setNewRecipe({...newRecipe, [event.target.name]: event.target.value})
    }


    const handleSubmit = (event) => {
        event.preventDefault();
        handleAdd(newRecipe);
        setNewRecipe({title:"", link:"", photoPath: "", description:""});
    }

  // POST
  // const handleAdd = (newRecipe) => {

  //   const requestOptions = {
  //     method: 'POST',
  //     headers: { 'Content-Type': 'application/json' },
  //     body: JSON.stringify(newRecipe)
  //   }

  //   fetch('http://localhost:3030/recipe', requestOptions)
  //     .then(response => response.json())
  //     .then(data => {
  //       const recipesCopy = [...recipes]
  //       recipesCopy.push(data)
  //       setRecipes(recipesCopy)
  //       navigate(`/recipes/${data.id}`)
  //     },
  //     (error) => {
  //       console.error("Une erreur s'est produite lors de l'enregistrement de la recette", error)
  //     }
  //     )
  // }

  const handleAdd = (event) => {
    event.preventDefault();
    const formData = new FormData();
    const userId = '123456789';
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
            // .then(response => response.json())
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
                <label htmlFor="#input-title">Titre*</label>
                <input 
                    id='input-title'
                    type="text"
                    placeholder="Entrez votre titre ici"
                    name="title"
                    value={newRecipe.title} 
                    onChange={handleChange}
                />
                <label htmlFor="#input-link">Lien</label>
                <input 
                    id='input-link'
                    type="text"
                    placeholder="Si vous en avez, ajoutez votre lien ici"
                    name="link"
                    value={newRecipe.link}
                    onChange={handleChange} 
                />
                <label htmlFor="#input-description">Description</label>
                <input 
                    id='input-description'
                    type="text"
                    placeholder="Si vous n'avez pas de lien, ajoutez votre recette ici"
                    name="description"
                    value={newRecipe.description}
                    onChange={handleChange} 
                />
                <label htmlFor="#input-photo">Photo</label>
                <input 
                  type="file"
                  onChange={(event) => setImageSelected(event.target.files[0])}
                />
                <button onClick={(event) => {handleAdd(event)}}>Ajouter</button>
            </form>
        </div>
    )
}