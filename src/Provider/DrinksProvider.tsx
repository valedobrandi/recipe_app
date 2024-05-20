import RecipesContext from "../Context/DrinksContext";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  DrinskDataType,
  RecipeType,
  CategoriesType,
} from "../types/type";
import axios from "axios";
import useFetch from "../Hooks/useFetch";
type DrinksProviderType = {
  children: React.ReactNode;
};

type EffectCategoryType = {
  data: CategoriesType | undefined;
  loading: boolean;
};

export default function DrinksProvider({ children }: DrinksProviderType) {
  const [select, setSelect] = useState("All")
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<unknown>();
  const [drinks, setDrinks] = useState<RecipeType[]>([]);

  
  const categoryRef = useRef<string>('');
  const navigate = useNavigate();

  const { data: categories, loading: loadingCategories } = useFetch(
    "https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list"
  ) as EffectCategoryType;

  useEffect(() => {
    const url = "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=";
    fetchData(url);
  }, []);

  const filterDataKeys = (data: DrinskDataType[]) => {
    return data.map((value) => {
      return {
        id: value.idDrink,
        title: value.strDrink,
        img: value.strDrinkThumb,
        categories: value.strCategory,
      };
    });
  };

  const fetchData = async (url = "", redirect = true) => {
    setLoading(true);
    try {
      const { data } = await axios.get(url);
      setDrinks(filterDataKeys(data.drinks));

      if (data.drinks.length === 1 && redirect) {
        navigate(`${location.pathname}/${drinks[0].id}`);
      }
    } catch (error) {
      if (error instanceof Error) {
        setError(error);
        console.log(error);
        return window.alert("Receita não encontrada!");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleFetch = async (radio = "", input = "") => {
    switch (radio) {
      case "ingredient":
        fetchData(
          `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${input}`
        );
        break;
      case "name":
        fetchData(
          `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${input}`
        );
        break;
      case "firstLetter":
        fetchData(`https://www.thecocktaildb.com/api/json/v1/1/random.php`);
        break;
      default:
        break;
    }
  };
  
  const fetchByCategory = (category: string) => {
    setSelect(category) 
    
    if (category === "all" || categoryRef.current === category) {
      const url = "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=";
      categoryRef.current = category;
      return fetchData(url);
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
