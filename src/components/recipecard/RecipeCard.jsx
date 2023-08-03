import React from "react";
import { HashLink } from "react-router-hash-link";
import "./recipecard.css";

export default function RecipeCard({props}) {
    console.log(props)
    return(
        <HashLink to={`/recipes/${props._id}`}>
            <div className="recipe">
                <img className="recipe-photo" src="/images/recipe1.jpg" alt="recipePhoto" />
                <div className="recipe-infos">
                    <h4>{props.title}</h4>
                </div>
            </div>
        </HashLink>
    )
}