import Footer from "../../components/Footer";
import Header from "../../components/Header";
import perfil_logo from "../../assets/Perfil.svg"
import done_recipe_logo from "../../assets/done_recipe.svg"
import logout_logo from "../../assets/Logout.svg"
import favorite_logo from "../../assets/favorite_logo.svg"
import { useContext } from "react";
import LocalStoreContext from "../../Context/LocalStoreContext";
import ProfileButton from "../../components/ProfileButton";

export default function Profile() {
  const { UserStore, userClear } = useContext(LocalStoreContext)

  const clearLocalUser = () => {
    userClear()
  }

  return (
    <>
      <Header title="Profile" isSearch={false} icon={perfil_logo} />
      <div className="flex flex-col items-center mt-4 gap-10">
        <div>
          {UserStore.email && (
            <p className="font-bold lg:text-2xl"
            >{UserStore.email}
            </p>)}
        </div>
        <div>
          <ProfileButton logo={done_recipe_logo} nav="/favorite-recipes" title="Favorite Recipe" />
        </div>
        <div className="border-t-4 border-b-4 p-6">
          <ProfileButton logo={favorite_logo} nav="/done-recipes" title="Done Recipe" />
        </div>
        <div>
          <ProfileButton logo={logout_logo} nav="/" title="Logout" onClearStore={clearLocalUser} />
        </div>
      </div>
      <Footer />
    </>
  );
}

//requisito: 8
