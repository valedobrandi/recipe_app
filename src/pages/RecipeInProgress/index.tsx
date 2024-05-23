import { useNavigate, useParams } from "react-router-dom";

import { DataType, FavoriteType } from "../../types/type";

import DetailsRecipe from "../../components/DetailsRecipe";
import { useContext, useEffect, useState } from "react";
import useLocalStorage from "../../Hooks/useLocalStorage";

import { favoriteStore } from "../../services/favoriteStore";
import { reduceKeys } from "../../services/recipeDetails";
import UniqueRecipeContext from "../../Context/UniqueRecipeContext";
import LocalStoreContext from "../../Context/LocalStoreContext";
import { Button } from "@material-tailwind/react";

export default function RecipeInProgress() {
  const nagivate = useNavigate();
  const params = useParams();

  const { recipeDetail: data } = useContext(UniqueRecipeContext);

  const { doneRecipesStore, setDoneRecipesStore } = useContext(LocalStoreContext)

  const { store, setStorage } = useLocalStorage("inProgressRecipes", {});

  const dataRecipe: DataType = data ? data : [];
  const isMeals = "meals" in dataRecipe;
  const isDrinks = "drinks" in dataRecipe;
  const key = isMeals ? "meals" : "drinks";
  const idKey = params.id ? params.id : "";


  const [checkList, setCheckList] = useState<number[]>([]);

  useEffect(() => {
    if (store[key] && idKey in store[key]) {
      setCheckList(store[key][idKey]);
    }
  });

  const handleCheckBox = (ingredient: number, id: string) => {
    const key = isMeals ? "meals" : "drinks";
    const isChecked = checkList.includes(ingredient);
    const addStore = [...checkList, ingredient];
    const removeStore = checkList.filter((ingre) => ingre !== ingredient);
    isChecked ? setCheckList(removeStore) : setCheckList(addStore);
    isChecked
      ? setStorage({ ...store, [key]: { ...store[key], [id]: removeStore } })
      : setStorage({ ...store, [key]: { ...store[key], [id]: addStore } });
  };

  let favorite: FavoriteType;
  let id: string = ''
  let isFinish: string[] = [];
  if (isMeals) {
    const url = window.location.href.replace("/in-progress", "");

    favorite = favoriteStore(dataRecipe.meals, true, url);
    id = favorite.id;
    isFinish = reduceKeys(dataRecipe.meals[0], "strIngredient");
  }
  if (isDrinks) {
    const url = window.location.href.replace("/in-progress", "");

    favorite = favoriteStore(dataRecipe.drinks, false, url);
    id = favorite.id;
    isFinish = reduceKeys(dataRecipe.drinks[0], "strIngredient");
  }

  const handleFinishRecipeFavorite = () => {
    const isDoneRecipeStored = doneRecipesStore.find((doneRecipe) => doneRecipe.id === id)

    if (isDoneRecipeStored) return nagivate("/done-recipes");

    setDoneRecipesStore([...doneRecipesStore, favorite]);
    nagivate("/done-recipes");
  };

  const isDisabled = isFinish.filter((ingredients) => ingredients.length > 0);

  return (
    <>
      <div>
        <DetailsRecipe
          checkList={checkList}
          handleCheckBox={handleCheckBox}
          checkBox={true}
        />
        <div className="flex w-max gap-4 mx-auto m-4">
          <Button
            color="green"
            className="text-black lg:p-6 lg:text-2xl"
            onClick={handleFinishRecipeFavorite}
            disabled={isDisabled.length !== checkList.length}
          >
            Finish Recipe
          </Button>
        </div>
      </div>
    </>
  );
}

// REQUERIMENTO: 41
