import React, { useEffect, useLayoutEffect, useState } from "react";
import './updaterecipe.css';
import { useNavigate, useParams } from "react-router-dom";

export default function UpdateRecipe({ setShowNavbar }) {
    //State
    const navigate = useNavigate()

    // Récupérer l'id dans les params
    const recipeId = useParams().id

    // Utiliser un useState pour enregistrer les informations
    const [recipe, setRecipe] = useState([])

    // Récupérer les informations contenues dans la show
    const getRecipeDetails = async () => {
        let results = await fetch(`http://localhost:3030/recipe/${recipeId}`)
        results = await results.json()
        setRecipe(results)
    }


    // Behavior
    useLayoutEffect(() => {
        setShowNavbar(false);
    }, [])
    useEffect(()=> {
        getRecipeDetails()
    }, [])

    // Enregistrer les modifications effectuées
    const handleEdit = async (recipe) => {
        const requestOptions = {
            method: "PATCH",
            headers: { 'Content-Type' : 'application/json' },
            body: JSON.stringify(recipe)
        }

        fetch(`http://localhost:3030/recipe/${recipeId}`, requestOptions )
        .then(response => response.json())
        .then (data => {
            // Pas besoin de créer de copie ni de pusher, on veut écraser l'ancien data
            setRecipe(data)
            navigate(`/recipes/${data.id}`)
        })
    }

    // Modifier les informations déjà renseignées
    const handleChange = (event) => {
        // Afin de ne pas supprimer tout le state à la moindre modification:
        const { name, value } = event.target;
        setRecipe((prevRecipe) => ({
            ...prevRecipe,
            [name]: value,
        }));
        };
        

    // Effectuer l'enregistrement des données une fois le bouton appuyé
    const handleSubmit = (event) => {
        event.preventDefault();
        handleEdit(recipe);
    }

    // Render

    return(
        <div className="general-container">
            <h1>Ici, on modifie notre recette</h1>
            <form className='add-form' action="submit" onSubmit={handleSubmit}>
                <label htmlFor="#input-title">Titre*</label>
                <input 
                    id='input-title'
                    type="text"
                    placeholder="Entrez votre titre ici"
                    name="title"
                    value={recipe.title || ''}
                    onChange={handleChange}
                />

                <label htmlFor="#input-link">Lien</label>
                <input 
                    id='input-link'
                    type="text"
                    placeholder="Si vous en avez, ajoutez votre lien ici"
                    name="link"
                    value={recipe.link || ''}
                    onChange={handleChange} 
                />

                <label htmlFor="#input-description">Description</label>
                <input 
                    id='input-description'
                    type="text"
                    placeholder="Si vous n'avez pas de lien, ajoutez votre recette ici"
                    name="description"
                    value={recipe.description || ''}
                    onChange={handleChange} 
                />
                
                <button>Modifier</button>
            </form>
        </div>
    )
}