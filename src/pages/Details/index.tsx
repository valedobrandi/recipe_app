import { useNavigate, useParams } from "react-router-dom";
import { useContext } from "react";
import DrinksContext from "../../Context/DrinksContext";
import MealsContext from "../../Context/MealsContext";
import { Button } from "@material-tailwind/react";
import DetailsRecipe from "../../components/DetailsRecipe";
import Loading from "../../components/Loading";
import TypeRecommendation from "../../components/TypeRecommendation";
import useSearchRecipeById from "../../Hooks/useSearchRecipeById";

type DetailsProps = {
  type: string;
}


export default function Details({ type }: DetailsProps) {
  const navigate = useNavigate();
  const { id } = useParams();
  const { loading } = useSearchRecipeById(id)


  const { loading: drinksLoading } = useContext(DrinksContext);
  const { loading: mealsLoading } = useContext(MealsContext);



  const handleNavigateAndData = () => {
    if (type === 'meals') { return navigate(`/meals/${id}/in-progress`) }
    if (type === 'drinks') { return navigate(`/drinks/${id}/in-progress`) }
  };

  if (loading || mealsLoading || drinksLoading) return (
    <div className="flex justify-center m-20">
      <Loading />
    </div>
  );


  return (
    <div className="mb-20">
      <DetailsRecipe checkBox={false} />
      <div className="flex w-max gap-4 mx-auto m-4">
        <Button
          onClick={handleNavigateAndData}
          color="green" className="text-black lg:p-6 lg:text-2xl">
          Start
        </Button>
      </div>
      <hr />
      <h2 className="my-10 text-xl text-center font-bold">Other Recommendations</h2>
      <TypeRecommendation />
    </div>
  );
}
