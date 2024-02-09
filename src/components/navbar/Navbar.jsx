import React, { useEffect, useState } from "react";
import './navbar.css'
import axios from "axios";
import { jwtDecode } from 'jwt-decode';

export default function Navbar() {

  //state
  const [user, setUser] = useState([]);
  
  //behavior
  function getUserInfos() {
    const userId = JSON.parse(jwtDecode(localStorage.getItem('accessToken')).id);

    axios.get(`http://localhost:3030/user/${userId}`)
    .then(
      (response) => {
        console.log(response.data);
        setUser(response.data);
      },
      (error) => {
        console.error("Erreur lors de la récupération des données", error);
      }
      );
    }
  
  useEffect(()=> {
    if(localStorage.getItem('accessToken')) {
      getUserInfos();
    }
}, [])
  
  //render
  return (
    <nav className="navbar">
      <img id="user-photo" src={`https://res.cloudinary.com/dppjibpjb/image/upload/f_auto,q_auto/v1/${user.photoPath}`} alt="user's avatar"/>
    </nav>
  )
}
