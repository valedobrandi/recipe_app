import { useContext } from "react";
import DrinksContext from "../../Context/DrinksContext";
import MealsContext from "../../Context/MealsContext";
import UniqueRecipeContext from "../../Context/UniqueRecipeContext";
import { DataType } from "../../types/type";
import Recomendation from "../Recomendation";




export default function TypeRecommendation() {
  const { drinks: dataDrinks } = useContext(DrinksContext);
  const { meals: dataMeals } = useContext(MealsContext);
  const { recipeDetail: data } = useContext(UniqueRecipeContext);

  const drinks = dataDrinks ? dataDrinks.slice(0, 6) : [];
  const meals = dataMeals ? dataMeals.slice(0, 6) : [];

  const dataRecipe: DataType = data ? data : [];

  const isMeals = "meals" in dataRecipe;
  const isDrinks = "drinks" in dataRecipe;


  return (
    <>
      {isMeals && <Recomendation recipes={drinks} />}
      {isDrinks && <Recomendation recipes={meals} />}
    </>
  )
}