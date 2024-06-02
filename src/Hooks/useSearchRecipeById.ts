import { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { DataType, RecipeDetailType } from "../types/type";
import UniqueRecipeContext from "../Context/UniqueRecipeContext";
import { recipeDetails } from "../services/recipeDetails";

const useSearchRecipeById = (id: string | undefined) => {
  const location = useLocation();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error>();

  const { onSetRecipeDetail, recipeDetail: data } =
    useContext(UniqueRecipeContext);

  const isValid = location.pathname.includes("meals");
  const path = isValid ? "themealdb" : "thecocktaildb";

  const dataRecipe: DataType = data ? data : [];

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `https://www.${path}.com/api/json/v1/1/lookup.php?i=${id}`
        );
        const data = await response.json();
        onSetRecipeDetail(data);
      } catch (error) {
        if (error instanceof Error) {
          setError(error);
        }
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  let recipeDetail: RecipeDetailType[] = [];
  if ("meals" in dataRecipe && dataRecipe.meals) {
    recipeDetail = recipeDetails(dataRecipe.meals, true);
  }
  if ("drinks" in dataRecipe && dataRecipe.drinks) {
    recipeDetail = recipeDetails(dataRecipe.drinks, false);
  }
  return { error, loading, recipeDetail };
};

export default useSearchRecipeById;
