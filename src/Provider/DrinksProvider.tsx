import RecipesContext from "../Context/DrinksContext";
import { useEffect, useRef, useState } from "react";
import {
  CategoriesType,
} from "../types/type";
import useFetch from "../Hooks/useFetch";

import { DRINKS_BY_CATEGORIES_API, DRINKS_CATEGORIES_API, DRINKS_INGREDIENT_API, DRINKS_NAME_API, DRINKS_RANDOM_API } from "./utils/drinksAPI";
import useSearchRecipe from "../Hooks/useSearchRecipe";
type DrinksProviderType = {
  children: React.ReactNode;
};

type EffectCategoryType = {
  data: CategoriesType | undefined;
  loading: boolean;
};

export default function DrinksProvider({ children }: DrinksProviderType) {
  useEffect(() => {
    fetchData(DRINKS_NAME_API);
  }, []);

  const [select, setSelect] = useState("All")
  const categoryRef = useRef<string>('');
  const {
    data: categories,
    loading: loadingCategories
  } = useFetch(`${DRINKS_CATEGORIES_API}list`) as EffectCategoryType;

  const {
    data: drinks, error, fetchData, loading,
  } = useSearchRecipe('drinks', 'idDrink')


  const handleFetch = async (radio = "", input = "") => {
    switch (radio) {
      case "Ingredient":
        fetchData(`${DRINKS_INGREDIENT_API}${input}`);
        break;
      case "Name":
        fetchData(`${DRINKS_NAME_API}${input}`);
        break;
      case "Random recipe":
        fetchData(DRINKS_RANDOM_API);
        break;
      default:
        break;
    }
  };

  const fetchByCategory = (category: string) => {
    setSelect(category)

    if (category === "All" || categoryRef.current === category) {
      categoryRef.current = category;
      return fetchData(DRINKS_NAME_API, false);
    }
    fetchData(`${DRINKS_BY_CATEGORIES_API}${category}`, false);
    categoryRef.current = category;
  };




  return (
    <RecipesContext.Provider
      value={{
        select,
        drinks,
        error,
        loading,
        handleFetch,
        fetchByCategory,
        categories,
        loadingCategories,
      }}
    >
      {children}
    </RecipesContext.Provider>
  );
}

//REQUERIMENTO: 11, 12, 20, 19
