import React from 'react';
import SearchBar from '../../components/searchbar/SearchBar';
import './homepage.css';
import MainBtn from '../../components/mainbtn/MainBtn';
import { HashLink } from 'react-router-hash-link';

export default function Homepage() {

  return(
    <div className="general-container">
      <div className="homepage-container">
        <h1>Bienvenue sur Mon Petit Commis</h1>
        <SearchBar />
        <div className="btn-container">
          <HashLink to="/recipes">
            <MainBtn text="Consulter les recettes"/>
          </HashLink>
          <HashLink to="/new_recipe">
            <MainBtn text="Ajouter une recette"/>
          </HashLink>

          <HashLink to="/poc">
            <MainBtn text="poc"/>
          </HashLink>
        </div>
      </div>
    </div>

  )
}
