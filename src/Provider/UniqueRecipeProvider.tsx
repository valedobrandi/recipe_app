import { useState } from "react";
import { DataType, FavoriteType } from "../types/type";
import UniqueRecipeContext from "../Context/UniqueRecipeContext";
import useLocalStorage from "../Hooks/useLocalStorage";

type UniqueRecipeProviderType = {
  children: React.ReactNode;
};
type UseLocationType = {
  store: FavoriteType[];
  setStorage: (value: FavoriteType[]) => void;
}

export default function UniqueRecipeProvider({ children }: UniqueRecipeProviderType) {
  const { store, setStorage } = useLocalStorage<FavoriteType[]>(
    "favoriteRecipes", []) as UseLocationType

  const [recipeDetail, setRecipeDetail] = useState<DataType>([])


  const onSetRecipeDetail = (recipe: DataType) => {
    setRecipeDetail(recipe)
  }

  const onSetStore = (data: FavoriteType[]) => {
    setStorage(data)
  }

  return (
    <UniqueRecipeContext.Provider
      value={{
        onSetRecipeDetail,
        recipeDetail,
        store,
        onSetStore
      }}
    >
      {children}
    </UniqueRecipeContext.Provider>
  );
}