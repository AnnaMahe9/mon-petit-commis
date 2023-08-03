import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import './createrecipe.css'

export default function CreateRecipe() {
    //State
    const [recipes, setRecipes] = useState([])
    const [newRecipe, setNewRecipe] = useState({title:"", url:"", description:""});
    const navigate = useNavigate()

  // Behavior
    const handleChange = (event) => {
        setNewRecipe({...newRecipe, [event.target.name]: event.target.value})
    }


    const handleSubmit = (event) => {
        event.preventDefault();
        handleAdd(newRecipe);
        setNewRecipe({title:"", url:"", description:""});
    }

  // POST
  const handleAdd = (newRecipe) => {

    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newRecipe)
    }

    fetch('http://localhost:5000/recipes', requestOptions)
      .then(response => response.json())
      .then(data => {
        const recipesCopy = [...recipes]
        recipesCopy.push(data)
        setRecipes(recipesCopy)
        navigate(`/recipes/${data._id}`)
      },
      (error) => {
        console.error("Une erreur s'est produite lors de l'enregistrement de la recette", error)
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
                <label htmlFor="#input-url">Lien</label>
                <input 
                    id='input-url'
                    type="text"
                    placeholder="Si vous en avez, ajoutez votre lien ici"
                    name="url"
                    value={newRecipe.url}
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
                <button>Ajouter</button>
            </form>
        </div>
    )
}