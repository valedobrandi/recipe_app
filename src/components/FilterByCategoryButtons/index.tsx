import { useContext } from "react";
import MealsContext from "../../Context/MealsContext";
import DrinksContext from "../../Context/DrinksContext";
import { useLocation } from "react-router-dom";
import { SelectByCategory } from "../SelectByCategory";



export default function FilterByCategory() {
  const location = useLocation()
  const { categories: mealsData, fetchByCategory: fetchByMeals, select: selectMeal } = useContext(MealsContext);
  const { categories: drinksData, fetchByCategory: fetchByDrinks, select: selectDrink } = useContext(DrinksContext);
  const isMeals = location.pathname.includes('meals')
  const isDrinks = (location.pathname.includes('drinks'));
  const categoriesDrink = drinksData ? drinksData.drinks.map((str) => str.strCategory) : []
  const categoriesMeals = mealsData ? mealsData.meals.map((str) => str.strCategory) : []
  categoriesDrink.unshift("All")
  categoriesMeals.unshift("All")
  return (
    <>
      {isMeals && <SelectByCategory categories={categoriesMeals} fetchBy={fetchByMeals} select={selectMeal} />}
      {isDrinks && <SelectByCategory categories={categoriesDrink} fetchBy={fetchByDrinks} select={selectDrink} />}
    </>
  )
}