import React, { useEffect, useState } from 'react';
import SearchBar from '../../components/searchbar/SearchBar';
import { HashLink } from 'react-router-hash-link';
import './allrecipes.css';
import RecipeCard from '../../components/recipecard/RecipeCard';


export default function AllRecipes() {
    // State
    const [recipes, setRecipes] = useState([])

    // Behavior

    // GET Method
    useEffect(() => {
        fetch(`http://localhost:5000/recipes`)
            .then(response => response.json())
            .then(
                (response) => {
                    setRecipes(response); 
                },
                (error) => {
                    console.error('Erreur lors de la récupération des données:', error);
                }
            )
        }, []);

    // Render
    return (
        <div className="general-container">
            <div className="recipes-page-container">
                <h1>Toutes mes recettes</h1>
                {<SearchBar/>}
                <div className="recipes">
                    <HashLink to='/recette'>
                        <div className="recipe">
                            <img className="recipe-photo" src="/images/recipe1.jpg" alt="recipePhoto" />
                            <div className="recipe-infos">
                                <h4>Aubergine Pizza</h4>
                            </div>
                        </div>
                    </HashLink>
                    {
                        recipes.map(recipe => (
                            <RecipeCard 
                            key = {recipe._id}
                            props = {recipe}
                        />
                        ))
                    }
                </div>
            </div>
        </div>
    )
}