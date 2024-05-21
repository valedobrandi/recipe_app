import { useEffect, useState } from "react";
import {
  Navbar,
  MobileNav,
  Button,
  IconButton,
} from "@material-tailwind/react";
import icon_drink from "../../assets/icone-bebida.svg"
import icon_meals from "../../assets/icone-comida.svg"
import { useNavigate } from "react-router-dom";

export default function Footer() {
  const [openNav, setOpenNav] = useState(false);
  const navigate = useNavigate()

  useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false),
    );
  }, []);



  const handleClick = (type: string) => {
    if (type === 'drinks') {
      navigate('/drinks')
    }
    if (type === 'meals') {
      navigate('/meals')
    }
  }


  return (

    <Navbar className="fixed bottom-0 z-10 mx-auto h-max max-w-[1435px] bg-deep-purple-900
       rounded-none m-0">
      <div className="flex items-center justify-around text-blue-gray-900 px-4">
        <Button
          onClick={() => handleClick('drinks')}
          variant="text"
          size="sm"
          className="hidden lg:inline-block"
        >
          <img className="w-12" src={icon_drink} alt="meals" />
        </Button>
        <Button
          onClick={() => handleClick('meals')}
          variant="text"
          size="sm"
          className="hidden lg:inline-block"
        >
          <img className="w-16" src={icon_meals} alt="drinks" />
        </Button>
        <IconButton
          variant="text"
          className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
          ripple={false}
          onClick={() => setOpenNav(!openNav)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </IconButton>

      </div>
      <MobileNav open={openNav}>
        <div className="flex items-center justify-evenly gap-x-1">
          <Button
            onClick={() => handleClick('drinks')}
            variant="text" size="sm" className="">
            <img src={icon_drink} alt="meals" />
          </Button>
          <Button
            onClick={() => handleClick('meals')}
            variant="text" size="sm" className="">
            <img src={icon_meals} alt="drinks" />
          </Button>
        </div>
      </MobileNav>
    </Navbar>

  );
}
