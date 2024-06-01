import { useEffect, useRef, useState } from "react";
import { CategoriesType } from "../types/type";
import MealsContext from "../Context/MealsContext";
import useFetch from "../Hooks/useFetch";
import { MEALS_NAME_API, MEALS_CATEGORIES_API, MEALS_INGREDIENT_API, MEALS_RANDOM_API } from "./utils/MealsApi";
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
/*   const [loading, setLoading] = useState(true);
  const [error, setError] = useState<unknown>();
  const [meals, setMeals] = useState<RecipeType[]>([]); */

  const categoryRef = useRef<string>('');
  //const navigate = useNavigate();

  const {
    data: categories,loading: loadingCategories
  } = useFetch(`${MEALS_CATEGORIES_API}list`) as EffectCategoryType;

  const {
    data: meals, error, fetchData, loading,
  } = useSearchRecipe('meals', 'strMeals')




/*   const fetchData = async (url = "", redirect = true) => {
    setLoading(true);
    try {
      const response = await fetch(url);
      const data = await response.json()

      if (data.meals.length === 0 || data.meals === 'null') {
        return window.alert("Receita não encontrada!");
      }

      if (data.meals.length === 1 && redirect) {
        return navigate(`${location.pathname}/${data.meals[0].idMeal}`);
      }

      setMeals(filterDataKeys(data.meals));
    } catch (error) {
      if (error instanceof Error) {
        console.log(error);
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
    console.log(category);
   

    setSelect(category)
    if (category === "All" || categoryRef.current === category) {
      categoryRef.current = category;
      setSelect('All')
      return fetchData(MEALS_NAME_API, false);
    }
    fetchData(`${MEALS_INGREDIENT_API}${category}`, false);
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
