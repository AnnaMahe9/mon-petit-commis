import React, { useLayoutEffect } from 'react';
import SearchBar from '../../components/searchbar/SearchBar';
import './homepage.css';
import MainBtn from '../../components/mainbtn/MainBtn';
import { HashLink } from 'react-router-hash-link';
import { useAuth } from '../../utils/authentification';


export default function Homepage({ setShowNavbar }) {
  const { getToken } = useAuth();

  useLayoutEffect(() => {
    setShowNavbar(true);
    getToken();
  }, [])

  return(
    <div className="general-container">
      <div className="homepage-container">
        <h1>Bienvenue sur Mon Petit Commis</h1>
        <SearchBar />
        <div className="btn-container">
          <HashLink to="/recipes" className='homepage-link'>
            <MainBtn text="Consulter les recettes"/>
          </HashLink>
          <HashLink to="/new_recipe" className='homepage-link'>
            <MainBtn text="Ajouter une recette"/>
          </HashLink>
        </div>
      </div>
    </div>

  )
}
