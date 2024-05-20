import LocalStoreContext from "../Context/LocalStoreContext";
import useLocalStorage from "../Hooks/useLocalStorage";
import { FavoriteType } from "../types/type";

type DrinksProviderType = {
  children: React.ReactNode;
};

type UseLocationType = {
  store: FavoriteType[];
  setStorage: (value: FavoriteType[]) => void;
}

export default function LocalStoreProvider({ children }: DrinksProviderType) {
  const { store: favoriteRecipesStore, setStorage: setfavoriteRecipesStore } = useLocalStorage<FavoriteType[]>(
    "favoriteRecipes", []) as UseLocationType
  const { store: doneRecipesStore, setStorage: setDoneRecipesStore } = useLocalStorage<FavoriteType[]>("doneRecipes", []);
  const { store: UserStore, setStorage: setUserStore, clear: userClear } = useLocalStorage<{ email: string }>("user", { email: '' });



  return (
    <LocalStoreContext.Provider
      value={{
        favoriteRecipesStore,
        setfavoriteRecipesStore,
        doneRecipesStore,
        setDoneRecipesStore,
        UserStore,
        setUserStore,
        userClear
      }}
    >
      {children}
    </LocalStoreContext.Provider>
  );
}


