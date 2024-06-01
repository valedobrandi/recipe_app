import Recipes from "../../components/Recipes";
import { useContext } from "react";
import MealsContext from "../../Context/MealsContext";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import icon_meals from "../../assets/icone-comida.svg"
import Loading from "../../components/Loading";

export default function Meals() {
  const {
    meals,
    loading,
    loadingCategories,
  } = useContext(MealsContext);


  if (loading || loadingCategories) return <Loading />
    
  return (
    <>
      <Header title="MEALS" icon={icon_meals} />
      {meals && <Recipes recipes={meals.slice(0, 12)} />}
      <Footer />
    </>
  );
}

//REQUERIMENTO: 18, 19, 20
