import { useEffect, useRef, useState } from "react";
import { CategoriesType, MealsDataType, RecipeType } from "../types/type";
import { useNavigate } from "react-router-dom";
import MealsContext from "../Context/MealsContext";
import useFetch from "../Hooks/useFetch";

type MealsProviderType = {
  children: React.ReactNode;
};

type EffectCategoryType = {
  data: CategoriesType | undefined;
  loading: boolean;
};

export default function MealsProvider({ children }: MealsProviderType) {
  const [select, setSelect] = useState("All")
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<unknown>();
  const [meals, setMeals] = useState<RecipeType[]>([]);

  const categoryRef = useRef<string>('');
  const navigate = useNavigate();
  
  const { data: categories, loading: loadingCategories } = useFetch(
    "https://www.themealdb.com/api/json/v1/1/list.php?c=list"
  ) as EffectCategoryType;

  useEffect(() => {
    const url = "https://www.themealdb.com/api/json/v1/1/search.php?s=";
    fetchData(url);
  }, []);


  const filterDataKeys = (data: MealsDataType[]) => {
    return data.map((value) => {
      return {
        id: value.idMeal,
        title: value.strMeal,
        img: value.strMealThumb,
        categories: value.strCategory,
      };
    });
  };

  const fetchData = async (url = "", redirect = true) => {
    setLoading(true);
    try {
      const response = await fetch(url);
      const data = await response.json()
      setMeals(filterDataKeys(data.meals));

      if (data.meals.length === 0) {
        window.alert("Receita não encontrada!");
      }
      if (data.meals.length === 1 && redirect) {
        navigate(`${location.pathname}/${meals[0].id}`);
      }
    } catch (error) {
      if (error instanceof Error) {
        console.log(error);
        setError(error);
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
          `https://www.themealdb.com/api/json/v1/1/filter.php?i=${input}`
        );
        break;
      case "name":
        fetchData(
          `https://www.themealdb.com/api/json/v1/1/search.php?s=${input}`
        );
        break;
      case "firstLetter":
        fetchData(`https://www.themealdb.com/api/json/v1/1/random.php`);
        break;
      default:
        break;
    }
  };

  const fetchByCategory = (category: string) => {
    setSelect(category)
    if (category === "all" || categoryRef.current === category) {
      const url = "https://www.themealdb.com/api/json/v1/1/search.php?s=";
      categoryRef.current = category;
      return fetchData(url);
    }
    const url = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`;
    fetchData(url, false);
    categoryRef.current = category;
  };

  return (
    <MealsContext.Provider
      value={{ select, meals, error, loading, handleFetch, fetchByCategory, categories, loadingCategories  }}
    >
      {children}
    </MealsContext.Provider>
  );
}

//REQUERIMENTO: 11, 12, 20
