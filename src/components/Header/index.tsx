import { useState } from "react";
import { useNavigate } from "react-router-dom";
import SearchBar from "../SearchBar";
import SearchIcon from "../../assets/icone pesquiar.svg";
import HeaderLogo from "../../assets/icone_recipes_app.svg";
import HeaderLogoTitle from "../../assets/logo_recipes_app.svg";
import HeaderPerfil from "../../assets/icone-perfil.svg";

type HeaderProps = {
  title: string;
  isSearch?: boolean;
  icon: string;
};
export default function Header({ title, isSearch = true, icon }: HeaderProps) {
  const [isToggle, setIsToggle] = useState(false);
  const navigate = useNavigate();

  return (
    <div>
      <nav className="border-gray-200 bg-yellow-500 dark:bg-gray-800 dark:border-gray-700">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <div className="flex items-center space-x-3 rtl:space-x-reverse">
            <img src={HeaderLogo} className="h-8 lg:h-12" alt="Header Logo" />
            <img src={HeaderLogoTitle} className="h-5 lg:h-8" alt="Recipe App" />
          </div>
          <div>
            <button
              onClick={() =>
                navigate("/profile")
              }
              data-collapse-toggle="navbar-solid-bg"
              type="button" className="mr-14 p-2"
              aria-controls="navbar-solid-bg"
              aria-expanded="false">
              <img src={HeaderPerfil} alt="profile" className="w-[35px] lg:w-12" />
            </button>
            {isSearch && (
              <button
                onClick={() => setIsToggle(!isToggle)}
                data-collapse-toggle="navbar-solid-bg"
                type="button"
                className="p-2"
                aria-controls="navbar-solid-bg"
                aria-expanded="false">
                <img src={SearchIcon} alt="open search bar" className="w-[35px] lg:w-12" />
              </button>)}
          </div>
        </div>
      </nav>
      <img
        className='m-auto p-5 w-44'
        src={icon} alt="" />
      <h1
        className="text-center text-deep-purple-800 font-extrabold text-4xl"
      >{title}</h1>
      {isToggle && <SearchBar />}
    </div>

  );
}

