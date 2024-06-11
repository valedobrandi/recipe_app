import { useContext, useRef } from "react";

import { favoriteStore } from "../../services/favoriteStore";
import { DataType, FavoriteType } from "../../types/type";
import UniqueRecipeContext from "../../Context/UniqueRecipeContext";
import { useLocation } from "react-router-dom";
import LocalStoreContext from "../../Context/LocalStoreContext";
import like_icon from "../../assets/like.svg"
import dislike_icon from "../../assets/dislike.svg"
import ShareButton from "../share_button";

export default function FavAndCopyBtn({ id }: { id: string }) {
  const location = useLocation()

  const { recipeDetail: data } = useContext(UniqueRecipeContext);
  const { favoriteRecipesStore, setfavoriteRecipesStore } = useContext(LocalStoreContext)

  const titleRef = useRef("")
  const isStore = favoriteRecipesStore ? favoriteRecipesStore : [];
  const dataRecipe: DataType = data ? data : [];



  const isValid = location.pathname.includes('done-recipes') ? false : true

  let favorite: FavoriteType;

  if ("meals" in dataRecipe) {
    favorite = favoriteStore(dataRecipe.meals, true, window.location.href);
    titleRef.current = favorite.name
  }
  if ("drinks" in dataRecipe) {
    favorite = favoriteStore(dataRecipe.drinks, false, window.location.href);
    titleRef.current = favorite.name
  }


  const isFavorite = isStore.find((fav: FavoriteType) => { return fav.id === id })
  const handleFavorite = () => {
    if (id === null) return
    const filter = favoriteRecipesStore.filter((fav: FavoriteType) => fav.id !== id);
    isFavorite ? setfavoriteRecipesStore(filter) : setfavoriteRecipesStore([...favoriteRecipesStore, favorite]);
  };


  return (
    <div className="relative flex justify-center">
      {isValid && <ShareButton title={titleRef.current} />}
      {isValid && <button onClick={handleFavorite}>
        {isFavorite ?
          <img src={like_icon} alt="like" className="ml-12 w-10 lg:w-12" />
          : <img src={dislike_icon} alt="dislike" style={{ filter: "brightness(0) invert(1)" }}
            className="ml-12 w-10 lg:w-12 fill-light-green-50" />
        }
      </button>}
    </div>
  );
}
