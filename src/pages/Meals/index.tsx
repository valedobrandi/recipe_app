import Recipes from "../../components/Recipes";
import { useContext } from "react";
import MealsContext from "../../Context/MealsContext";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import icon_meals from "../../assets/icone-comida.svg"
import Loading from "../../components/Loading";
import FilterByCategory from "../../components/FilterByCategoryButtons";

export default function Meals() {
  const {
    meals,
    loading,
  } = useContext(MealsContext);


  return (
    <>
      <div className="pb-1">
        <Header title="MEALS" icon={icon_meals} />
        <FilterByCategory />
        {meals && !loading
          ? <Recipes recipes={meals.slice(0, 12)} />
          : <Loading />}
      </div>
      <Footer />
    </>
  );
}


