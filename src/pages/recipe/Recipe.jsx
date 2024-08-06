import { faLink, faPen, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useLayoutEffect, useState } from 'react';
import './recipe.css'
import { useNavigate, useParams } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';
import { useAuth } from '../../utils/authentification';

export default function Recipe({ setShowNavbar }) {
    // State
    const recipeId = useParams().id;
    const [recipe, setRecipe] = useState([]);
    const [recipes, setRecipes] = useState([]);
    const navigate = useNavigate();

    // Behavior
    useLayoutEffect(() => {
        setShowNavbar(true);
        const { getToken } = useAuth();

        useLayoutEffect(() => {
          setShowNavbar(true);
          getToken();
        }, [])
    }, [])
    // GET method
    useEffect(()=> {
        fetch(`http://localhost:3030/recipe/${recipeId}`)
        .then (response => response.json())
        .then (
            (data) => {
                console.log(data)
                setRecipe(data)
                console.log(recipe)
                
            },
            (error) => {
                console.error("Erreur lors de la récupération des données", error)
            }
        );
    }, [])

    // DELETE method
    const handleDelete = () => {
        fetch(`http://localhost:3030/recipe/${recipeId}`, {method: 'DELETE'})
            .then((res) => res.json())
            .then(
            () => {
                // Met à jour la liste des tâches après la suppression réussie
                const recipesCopyUpdated = recipes.filter((recipe) => recipe.id !== recipeId)
                setRecipes(recipesCopyUpdated)
                navigate('/recipes')
            },
            (error) => {
                console.error('Erreur lors de la suppression des données', error);
            }
        );
    }

    // Render
    
    return(
        <div className="general-container">
            <div className="recipe-container">
                <div className="recipe-title-container">
                    <HashLink to={`/recipes/${recipe.id}/update_recipe`}>
                        <FontAwesomeIcon className='icon' icon={faPen} />
                    </HashLink>
                    <div className="title-infos">
                        <h1 id='recetteTitle'>{recipe.title}</h1>
                        {
                            !recipe.category ? <h3>- Non catégorisé -</h3> : <h3>- {recipe.category} -</h3> 
                        }
                    </div>
                    <FontAwesomeIcon className='icon' icon={faTrash} onClick={handleDelete} />
                </div>
                { recipe.photoPath ?
                    <img className='big-recipe-photo' src={`https://res.cloudinary.com/dppjibpjb/image/upload/f_auto,q_auto/v1/${recipe.photoPath}`} alt="recipe1" />
                    :
                    <img className='big-recipe-photo' src="/images/recipe1.jpg" alt="recipe1" />
                }

                <div className="link-container">
                    <FontAwesomeIcon className='icon' icon={faLink} />
                    {
                        !recipe.link ? <p>Tout est dans la description !</p> : <p>{recipe.link}</p>
                    }
                </div>
                <div className='recipe-infos'>
                    <h2>Recette</h2>
                    <div className="recipe-paragraph">
                        {
                            recipe.link ? <p>Tout est dans le lien !</p> : <p>Recette de chef.fe</p>
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