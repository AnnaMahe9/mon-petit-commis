import React from 'react';
import { Routes, Route } from "react-router-dom";
import Navbar from './components/navbar/Navbar';
import Homepage from './pages/homepage/homePage';
import AllRecipes from './pages/allrecipes/AllRecipes';
import Recipe from './pages/recipe/Recipe';
import CreateRecipe from './pages/createrecipe/createRecipe';
import UpdateRecipe from './pages/updaterecipe/UpdateRecipe';
import './App.css';
import Poc from './pages/poc/poc';

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" Component={Homepage}></Route>
        <Route path="/recipes" Component={AllRecipes}></Route>
        <Route path="/recipes/:id" Component={Recipe}></Route>
        <Route path="/new_recipe" Component={CreateRecipe}></Route>
        <Route path="recipes/:id/update_recipe" Component={UpdateRecipe}></Route>
        <Route path="poc" Component={Poc}></Route>
      </Routes>
    </div>
  );
}

export default App;
