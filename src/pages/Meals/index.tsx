import Recipes from "../../components/Recipes";
import { useContext } from "react";
import MealsContext from "../../Context/MealsContext";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import icone_meals from "../../assets/icone-prato.png";
import Loading from "../../components/Loading";

export default function Meals() {
  const {
    meals,
    loading: isMeals,
    loadingCategories: loading,
  } = useContext(MealsContext);

  return (
    <>
      <Header title="MEALS" icon={icone_meals} />
      {isMeals || (loading && <Loading />)}
      {meals && !isMeals && <Recipes recipes={meals.slice(0, 12)} />}
      <Footer />
    </>
  );
}

//REQUERIMENTO: 18, 19, 20
