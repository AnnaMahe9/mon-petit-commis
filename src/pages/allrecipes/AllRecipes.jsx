import React, { useEffect, useLayoutEffect, useState } from 'react';
import SearchBar from '../../components/searchbar/SearchBar';
import './allrecipes.css';
import RecipeCard from '../../components/recipecard/RecipeCard';
import { jwtDecode } from 'jwt-decode';
import { getUserId, useAuth } from '../../utils/authentification';


export default function AllRecipes({ setShowNavbar }) {
    // State
    const [recipes, setRecipes] = useState([])
    
    // Behavior
    const { getToken } = useAuth();
    
    useLayoutEffect(() => {
        setShowNavbar(true);
        getToken();
    }, [])
    const userId = getUserId();
    console.log("tata");
    // GET Method
    useEffect(() => {
        fetch(`http://localhost:3030/recipe/user/${userId}`)
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