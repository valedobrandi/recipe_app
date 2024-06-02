import { useEffect, useRef, useState } from "react";
import { CategoriesType } from "../types/type";
import MealsContext from "../Context/MealsContext";
import useFetch from "../Hooks/useFetch";
import { MEALS_NAME_API, MEALS_CATEGORIES_API, MEALS_INGREDIENT_API, MEALS_RANDOM_API, MEALS_BY_CATEGORIES_API } from "./utils/mealsApi";
import useSearchRecipe from "../Hooks/useSearchRecipe";

type MealsProviderType = {
  children: React.ReactNode;
};

type EffectCategoryType = {
  data: CategoriesType | undefined;
  loading: boolean;
};

export default function MealsProvider({ children }: MealsProviderType) {

  useEffect(() => {
    fetchData(MEALS_NAME_API);
  }, []);

  const [select, setSelect] = useState("All")
  const categoryRef = useRef<string>('');


  const {
    data: categories, loading: loadingCategories
  } = useFetch(`${MEALS_CATEGORIES_API}list`) as EffectCategoryType;

  const {
    data: meals, error, fetchData, loading,
  } = useSearchRecipe('meals', 'idMeal')

  const handleFetch = async (radio = "", input = "") => {
    switch (radio) {
      case "Ingredient":
        fetchData(`${MEALS_INGREDIENT_API}${input}`);
        break;
      case "Name":
        fetchData(`${MEALS_NAME_API}${input}`);
        break;
      case "Random recipe":
        fetchData(MEALS_RANDOM_API);
        break;
      default:
        break;
    }
  };

  const fetchByCategory = (category: string) => {
    setSelect(category)
    if (category === "All" || categoryRef.current === category) {
      categoryRef.current = category;
      setSelect('All')
      return fetchData(MEALS_NAME_API, false);
    }
    fetchData(`${MEALS_BY_CATEGORIES_API}${category}`, false);
    categoryRef.current = category;
  };

  return (
    <MealsContext.Provider
      value={{ select, meals, error, loading, handleFetch, fetchByCategory, categories, loadingCategories }}
    >
      {children}
    </MealsContext.Provider>
  );
}

//REQUERIMENTO: 11, 12, 20
