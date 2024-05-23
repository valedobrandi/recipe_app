import { useContext } from "react";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import Recipes from "../../components/Recipes";
import DrinksContext from "../../Context/DrinksContext";
import drinkIcon from "../../assets/icone-bebida.svg"
import Loading from "../../components/Loading";

export default function Drinks() {


  const { drinks, loading, loadingCategories } = useContext(DrinksContext);


  if (loading || loadingCategories) return <Loading />

  return (
    <>
      <Header title="Drinks" icon={drinkIcon} />
      {drinks && <Recipes recipes={drinks.slice(0, 12)} />}
      <Footer />
    </>
  );
}
//REQUERIMENTO: 18, 19, 20
