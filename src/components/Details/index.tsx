import { useNavigate, useParams } from "react-router-dom";
import { DrinskDataType, MealsDataType } from "../../types/type";
import Recomendation from "../Recomendation";
import DetailsRecipe from "../DetailsRecipe";
import { useContext } from "react";
import UniqueRecipeContext from "../../Context/UniqueRecipeContext";
import DrinksContext from "../../Context/DrinksContext";
import MealsContext from "../../Context/MealsContext";
import { Button } from "@material-tailwind/react";
import Loading from "../Loading";

type DataType = { meals: MealsDataType[] } | { drinks: DrinskDataType[] } | [];

export default function Details() {
  const navigate = useNavigate();
  const { id } = useParams();

  const { recipeDetail: data } = useContext(UniqueRecipeContext);
  const { drinks: dataDrinks, loading: drinksLoading } = useContext(DrinksContext);
  const { meals: dataMeals, loading: mealsLoading } = useContext(MealsContext);

  const drinks = dataDrinks ? dataDrinks.slice(0, 6) : [];
  const meals = dataMeals ? dataMeals.slice(0, 6) : [];

  const dataRecipe: DataType = data ? data : [];
  const isMeals = "meals" in dataRecipe;
  const isDrinks = "drinks" in dataRecipe;


  const handleNavigateAndData = () => {
    if (isMeals) { return navigate(`/meals/${id}/in-progress`) }
    if (isDrinks) { return navigate(`/drinks/${id}/in-progress`) }
  };


  return (
    <>
      <div>
        <DetailsRecipe checkBox={false} />
        <div className="flex w-max gap-4 mx-auto m-4">
          <Button  onClick={handleNavigateAndData} color="green" className="text-black lg:p-6 lg:text-2xl">Start Recipe</Button>
        </div>
      </div>
      <hr />
      <h2 className="my-10 text-xl text-center font-bold">Other Recommendations</h2>
      {drinksLoading
        ? <Loading />
        : (isMeals && <Recomendation recipes={drinks} />)}
      {mealsLoading
        ? <Loading />
        : (isDrinks && <Recomendation recipes={meals} />)}
    </>
  );
}
