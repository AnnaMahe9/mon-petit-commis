import React from "react";
import { HashLink } from "react-router-hash-link";
import "./recipecard.css";

export default function RecipeCard({props}) {
    console.log(props)
    return(
        <HashLink to={`/recipes/${props.id}`}>
            <div className="recipe">
                <img className="recipe-photo" src={`https://res.cloudinary.com/dppjibpjb/image/upload/f_auto,q_auto/v1/${props.photoPath}`} alt="recipePhoto" />
                <div className="recipe-infos">
                    <h4>{props.title}</h4>
                </div>
            </div>
        </HashLink>
    )
}