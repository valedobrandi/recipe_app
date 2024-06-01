import { Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./pages/Login";
import Meals from "./pages/Meals";
import Profile from "./pages/Profile";
import Drinks from "./pages/Drinks";
import DoneRecipes from "./pages/DoneRecipes";
import FavoriteRecipes from "./pages/FavoriteRecipes";
import RecipeInProgress from "./pages/RecipeInProgress";
import Details from "./pages/Details";


function App() {
  return (
    <div className="max-w-[1440px] mx-auto min-h-screen">
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/meals" element={<Meals />} />
      <Route path="/drinks" element={<Drinks />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/done-recipes" element={<DoneRecipes />} />
      <Route path="/favorite-recipes" element={<FavoriteRecipes />} />
      <Route path="/meals/:id" element={<Details type="meals" />} />
      <Route path="/drinks/:id" element={<Details type="drinks"/>} />
      <Route path="/meals/:id/in-progress" element={<RecipeInProgress />} />
      <Route path="/drinks/:id/in-progress" element={<RecipeInProgress />} />
    </Routes>
    </div>
  );
}

export default App;


