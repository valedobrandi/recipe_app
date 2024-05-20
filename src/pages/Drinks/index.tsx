import { useContext } from "react";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import Recipes from "../../components/Recipes";
import DrinksContext from "../../Context/DrinksContext";
import drinkIcon from "../../assets/icone-bebida.svg"

export default function Drinks() {

  
  const { drinks, loading: isDrinks, loadingCategories: loading } = useContext(DrinksContext);




  return (
    <>
      <Header title="Drinks" icon={drinkIcon} />
      {isDrinks || loading && <p>Loading...</p>}
      {drinks && !isDrinks && (
        <Recipes
          recipes={drinks.slice(0, 12)}
        />
      )}
      <Footer />
    </>
  );
}
//REQUERIMENTO: 18, 19, 20
