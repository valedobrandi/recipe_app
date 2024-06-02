import { useContext } from "react";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import Recipes from "../../components/Recipes";
import DrinksContext from "../../Context/DrinksContext";
import drinkIcon from "../../assets/icone-bebida.svg"
import Loading from "../../components/Loading";
import FilterByCategory from "../../components/FilterByCategoryButtons";

export default function Drinks() {


  const { drinks, loading } = useContext(DrinksContext);


  return (
    <>
      <Header title="Drinks" icon={drinkIcon} />
      <FilterByCategory />
      {drinks && !loading
        ? <Recipes recipes={drinks.slice(0, 12)} />
        : <Loading />}
      <Footer />
    </>
  );
}
//REQUERIMENTO: 18, 19, 20
