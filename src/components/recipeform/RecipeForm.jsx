import React, { useEffect, useState } from 'react';
import './addform.css'

export default function AddForm({handleAdd}) {
    //State
    const [newRecipe, setNewRecipe] = useState({title:"", url:"", description:""});
    // const [recipe, setRecipe] = useState([]);

    //Behavior
    const handleChange = (event) => {
        setNewRecipe({...newRecipe, [event.target.name]: event.target.value})
    }


    const handleSubmit = (event) => {
        event.preventDefault();
        handleAdd(newRecipe);
        setNewRecipe({title:"", url:"", description:""});
    }


    //Render
    return(
        <form className='add-form' action="submit" onSubmit={handleSubmit}>
            <label htmlFor="#input-title">Titre*</label>
            <input 
                id='input-title'
                type="text"
                placeholder="Entrez votre titre ici"
                name="title"
                value={newRecipe.title} 
                onChange={handleChange}
            />
            <label htmlFor="#input-url">Lien</label>
            <input 
                id='input-url'
                type="text"
                placeholder="Si vous en avez, ajoutez votre lien ici"
                name="url"
                value={newRecipe.url}
                onChange={handleChange} 
            />
            <label htmlFor="#input-description">Description</label>
            <input 
                id='input-description'
                type="text"
                placeholder="Si vous n'avez pas de lien, ajoutez votre recette ici"
                name="description"
                value={newRecipe.description}
                onChange={handleChange} 
            />
            <button>Ajouter</button>
        </form>
    )
}