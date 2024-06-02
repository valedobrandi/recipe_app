import { useNavigate } from "react-router-dom";
import filterDataKeys from "../services/filterDataKeys";
import { RecipeType } from "../types/type";
import { useState } from "react";

const useSearchRecipe = (key: string, idKey: string) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error>();
  const [data, setData] = useState<RecipeType[]>([]);

  const navigate = useNavigate();

  const fetchData = async (url = "", redirect = true) => {
    setLoading(true);
    try {
      const response = await fetch(url);
      const data = await response.json();

      if (data[key].length === 0 || data[key] === "null") {
        return window.alert("Receita não encontrada!");
      }

      if (data[key].length === 1 && redirect) {
        return navigate(`${location.pathname}/${data[key][0][idKey]}`);
      }

      setData(filterDataKeys(data[key]));
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
  return { fetchData, data, error, loading, setData, setError, setLoading };
};

export default useSearchRecipe;
