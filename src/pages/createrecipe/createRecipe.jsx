import React, { useState } from "react";
import AddForm from "../../components/addform/AddForm";
import { useNavigate } from "react-router-dom";

export default function CreateRecipe() {
    //State
    const [recipes, setRecipes] = useState([])
    const navigate = useNavigate()

  // Behavior

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
            <AddForm handleAdd={handleAdd}/>
        </div>
    )
}