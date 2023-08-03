import { faLink, faPen, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import './recipe.css'
import { useParams } from 'react-router-dom';

export default function Recipe() {
    // State
    const recipeId = useParams().id
    const [recipe, setRecipe] = useState([])

    // Behavior

    // GET method
    useEffect(()=> {
        fetch(`http://localhost:5000/recipes/${recipeId}`)
        .then (response => response.json())
        .then (
            (data) => {
                setRecipe(data)
            },
            (error) => {
                console.error("Erreur lors de la récupération des données", error)
            }
        );
    }, [])

    // RENDER
    return(
        <div className="general-container">
            <div className="recipe-container">
                <div className="recipe-title-container">
                    <FontAwesomeIcon className='icon' icon={faPen} />
                    <div className="title-infos">
                        <h1>{recipe.title}</h1>
                        {
                            !recipe.category ? <h3>- Non catégorisé -</h3> : <h3>- {recipe.category} -</h3> 
                        }
                    </div>
                    <FontAwesomeIcon className='icon' icon={faTrash} />
                </div>

                <img className='big-recipe-photo' src="/images/recipe1.jpg" alt="recipe1" />

                <div className="link-container">
                    <FontAwesomeIcon className='icon' icon={faLink} />
                    {
                        !recipe.url ? <p>Tout est dans la description !</p> : <p>{recipe.url}</p>
                    }
                </div>
                <div className='recipe-infos'>
                    <h2>Recette</h2>
                    <div className="recipe-paragraph">
                        {
                            recipe.url ? <p>Tout est dans le lien !</p> : <p>Recette de chef.fe</p>
                        }
                        <div className="divider"></div>
                        {
                            !recipe.description ? <p>Tout est dans le lien !</p> : <p>{recipe.description}</p>
                        }
                    </div>
                    <h2>Commentaires</h2>
                    <div className="comment-paragraph">
                        <p>lorem ipsum blabla bla bla</p>
                        <div className="icons-container">
                            <FontAwesomeIcon className='icon' icon={faPen} />
                            <FontAwesomeIcon className='icon' icon={faTrash} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}