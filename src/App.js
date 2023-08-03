import React from 'react';
import Navbar from './components/navbar/Navbar';
import { Routes, Route } from "react-router-dom";
import './App.css';
import Homepage from './pages/homepage/homePage';
import AllRecipes from './pages/allrecipes/AllRecipes';
import Recipe from './pages/recipe/Recipe';
import CreateRecipe from './pages/createrecipe/createRecipe';

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" Component={Homepage}></Route>
        <Route path="/recipes" Component={AllRecipes}></Route>
        <Route path="/recipes/:id" Component={Recipe}></Route>
        <Route path="/new_recipe" Component={CreateRecipe}></Route>
      </Routes>
    </div>
  );
}

export default App;
