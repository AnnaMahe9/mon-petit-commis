import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import './searchbar.css';

export default function SearchBar() {
  return (
    <div className="searchbar-container">
      <FontAwesomeIcon icon={faMagnifyingGlass} flip="horizontal" className="icon"/>
      <input 
        className="search-input"
        type="text" 
        placeholder="Chercher une recette, un ingrédient...">
      </input>
    </div>

  )
}
