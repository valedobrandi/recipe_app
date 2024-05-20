
import { useContext, useState } from "react";
import Header from "../../components/Header";
import LocalStoreContext from "../../Context/LocalStoreContext";
import FavCard from "../../components/FavCard ";
import favorite_logo from "../../assets/favorite_logo.svg"
import BtnFilters from "../../components/BtnFilters";
import Footer from "../../components/Footer";


export default function FavoriteRecipes() {
  const {favoriteRecipesStore} = useContext(LocalStoreContext)
  const [filter, setFilter] = useState('all')
  const filterTypeDoneRecipes = filter !== 'all'
    ? favoriteRecipesStore.filter(({ type }) => type === filter)
    : favoriteRecipesStore
    
  return (
    <>
      <Header title="Favorite Recipes" isSearch={false} icon={favorite_logo} />
      <BtnFilters setFilter={setFilter} />
      <FavCard recipe={filterTypeDoneRecipes} />
      <Footer />
    </>
  );
}
