import React from "react";
import { HashLink } from "react-router-hash-link";
import "./recipecard.css";

export default function RecipeCard({props}) {
    console.log(props)
    const truncateText = (description, maxTextLength) => {
        // console.log('oui oui', description)
        let truncatedText = description;
        if(description.length > maxTextLength) {
            truncatedText = description.substring(0, maxTextLength) + "..."
        }
        return truncatedText;
    }

    return(
        <div className="recipe-card-container">
            <HashLink to={`/recipes/${props.id}`}>
                <div className="recipe">
                    {props.photoPath ? 
                        <img className="recipe-photo" src={`https://res.cloudinary.com/dppjibpjb/image/upload/f_auto,q_auto/v1/${props.photoPath}`} alt="recipePhoto" />
                        :
                        <img className="recipe-photo" src="/images/recipe1.jpg" alt="recipePhoto" />
                    }

                    <div className="recipe-slug">
                        <h4>{props.title}</h4>
                        <p>{truncateText(props.description, 30)}</p>
                    </div>
                </div>
            </HashLink>
        </div>
    )
}