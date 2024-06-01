import RecipesContext from "../Context/DrinksContext";
import { useEffect, useRef, useState } from "react";
import {
  CategoriesType,
} from "../types/type";
import useFetch from "../Hooks/useFetch";

import { DRINKS_CATEGORIES_API, DRINKS_INGREDIENT_API, DRINKS_NAME_API, DRINKS_RANDOM_API } from "./utils/drinksAPI";
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
/*   const [loading, setLoading] = useState(true);
  const [error, setError] = useState<unknown>();
  const [drinks, setDrinks] = useState<RecipeType[]>([]); */

  
  const categoryRef = useRef<string>('');
  //const navigate = useNavigate();

  const {
     data: categories, 
     loading: loadingCategories 
    } = useFetch(`${DRINKS_CATEGORIES_API}list`) as EffectCategoryType;

    const {
      data: drinks, error, fetchData, loading,
    } = useSearchRecipe('drinks', 'idDrink')


/*   const fetchData = async (url = "", redirect = true) => {
    setLoading(true);
    try {
      const response = await fetch(url);
      const data = await response.json();

      if (data.drinks.length === 0 || data.drinks === 'null') {
        return window.alert("Receita não encontrada!");
      }
      
      if (data.drinks.length === 1 && redirect) {
       return  navigate(`${location.pathname}/${data.drinks[0].idDrink}`);
      }
      setDrinks(filterDataKeys(data.drinks));
    } catch (error) {
      if (error instanceof Error) {
        setError(error);
        return window.alert("Receita não encontrada!");
      }
    } finally {
      setLoading(false);
    }
  }; */

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
      const url = "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=";
      categoryRef.current = category;
      return fetchData(url, false);
    }
    const url = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${category}`;
    fetchData(url, false);
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
