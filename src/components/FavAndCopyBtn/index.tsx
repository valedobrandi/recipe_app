import { useContext } from "react";

import { favoriteStore } from "../../services/favoriteStore";
import { DataType, FavoriteType } from "../../types/type";
import UniqueRecipeContext from "../../Context/UniqueRecipeContext";
import { writeClipboardText } from "../../utils/writeClipboardText";
import { useLocation } from "react-router-dom";
import LocalStoreContext from "../../Context/LocalStoreContext";
import share_icon from "../../assets/Share.svg"
import like_icon from "../../assets/like.svg"
import dislike_icon from "../../assets/dislike.svg"

export default function FavAndCopyBtn({ id }: { id: string }) {
  const location = useLocation()

  const { recipeDetail: data } = useContext(UniqueRecipeContext);
  const { favoriteRecipesStore, setfavoriteRecipesStore } = useContext(LocalStoreContext)


  const isStore = favoriteRecipesStore ? favoriteRecipesStore : [];
  const dataRecipe: DataType = data ? data : [];



  const isValid = location.pathname.includes('done-recipes') ? false : true

  let favorite: FavoriteType;

  if ("meals" in dataRecipe) {
    favorite = favoriteStore(dataRecipe.meals, true, window.location.href);

  }
  if ("drinks" in dataRecipe) {
    favorite = favoriteStore(dataRecipe.drinks, false, window.location.href);

  }


  const isFavorite = isStore.find((fav: FavoriteType) => { return fav.id === id })
  const handleFavorite = () => {
    if (id === null) return
    const filter = favoriteRecipesStore.filter((fav: FavoriteType) => fav.id !== id);
    isFavorite ? setfavoriteRecipesStore(filter) : setfavoriteRecipesStore([...favoriteRecipesStore, favorite]);
  };





  return (
    <div className="flex justify-center">
      {isValid && <button onClick={() => writeClipboardText(window.location.href)} data-testid="share-btn">
        <img src={share_icon} alt="" className="lg:w-16" />
      </button>}
      {isValid && <button onClick={handleFavorite} data-testid="favorite-btn">
        {isFavorite ?
          <img src={like_icon} alt="like" className="ml-12 lg:w-16" />
          : <img src={dislike_icon} alt="dislike" style={{ filter: "brightness(0) invert(1)" }} alt="" className="ml-12 lg:w-16 fill-light-green-50" />
        }
      </button>}
    </div>
  );
}
