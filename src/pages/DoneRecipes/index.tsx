
import Header from "../../components/Header";
import done_recipe_logo from "../../assets/done_recipe.svg"
import { useContext, useState } from "react";
import LocalStoreContext from "../../Context/LocalStoreContext";
import BtnFilters from "../../components/BtnFilters";
import Footer from "../../components/Footer";
import DoneCard from "../../components/DoneCard";


export default function DoneRecipes() {
  const { doneRecipesStore } = useContext(LocalStoreContext)
  const [filter, setFilter] = useState('all')
  const filterTypeDoneRecipes = filter !== 'all'
    ? doneRecipesStore.filter(({ type }) => type === filter)
    : doneRecipesStore

  return (
    <>
      <Header title="Done Recipes" isSearch={false} icon={done_recipe_logo} />
      <BtnFilters setFilter={setFilter} />
        <DoneCard recipe={filterTypeDoneRecipes} />
      <Footer />
    </>
  );
}
