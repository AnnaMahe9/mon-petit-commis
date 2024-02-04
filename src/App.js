import React, { useState } from 'react';
import { Routes, Route } from "react-router-dom";
import Navbar from './components/navbar/Navbar';
import Homepage from './pages/homepage/homePage';
import AllRecipes from './pages/allrecipes/AllRecipes';
import Recipe from './pages/recipe/Recipe';
import CreateRecipe from './pages/createrecipe/createRecipe';
import UpdateRecipe from './pages/updaterecipe/UpdateRecipe';
import './App.css';
import SignUp from './pages/signup/signup';
import Login from './pages/login/login';

function App() {
  
  const [showNavbar, setShowNavbar] = useState(true);

  return (
    <div className="App">
      { showNavbar && <Navbar /> }
      <Routes>
        <Route path="/" element={<Homepage setShowNavbar={setShowNavbar} />}></Route>
        <Route path="/recipes" element={<AllRecipes setShowNavbar={setShowNavbar}/>}></Route>
        <Route path="/recipes/:id" element={<Recipe setShowNavbar={setShowNavbar}/>}></Route>
        <Route path="/new_recipe" element={<CreateRecipe setShowNavbar={setShowNavbar}/>}></Route>
        <Route path="recipes/:id/update_recipe" element={<UpdateRecipe setShowNavbar={setShowNavbar}/>}></Route>
        <Route path="/sign-up" element={<SignUp setShowNavbar={setShowNavbar}/>}></Route>
        <Route path="/login" element={<Login setShowNavbar={setShowNavbar}/>}></Route>
      </Routes>
    </div>
  );
}

export default App;
