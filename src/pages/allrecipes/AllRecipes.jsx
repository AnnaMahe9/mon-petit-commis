import React, { useEffect, useLayoutEffect, useState } from 'react';
import SearchBar from '../../components/searchbar/SearchBar';
import './allrecipes.css';
import RecipeCard from '../../components/recipecard/RecipeCard';


export default function AllRecipes({ setShowNavbar }) {
    // State
    const [recipes, setRecipes] = useState([])

    // Behavior
    useLayoutEffect(() => {
        setShowNavbar(true);
    }, [])
    // GET Method
    useEffect(() => {
        fetch(`http://localhost:3030/recipe`)
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
                    {
                        recipes.map(recipe => (
                            <RecipeCard 
                            key = {recipe.id}
                            props = {recipe}
                        />
                        ))
                    }
                </div>
            </div>
        </div>
    )
}