import { RecipeType } from "../../types/type";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { ProfileCard } from "../ProfileCard";
import { Link } from "react-router-dom";
import { RecipeCard } from "../RecipeCard";

type TypeRecomendationProps = {
  recipes: RecipeType[]
  title?: boolean;

};

export default function Recomendation({
  recipes,

}: TypeRecomendationProps) {

  const PATH = window.location.pathname.includes('drinks') ? 'meals' : 'drinks'


  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 3,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 2,
    },
  };

  return (
    <>
      <Carousel responsive={responsive} infinite={true}>
        {recipes &&
          recipes.map((recipe) => (
            <Link
              key={recipe.id}
              to={`../${PATH}/${recipe.id}`}
              reloadDocument
            >
              <RecipeCard
                key={recipe.id}
                id={recipe.id}
                img={recipe.img}>
                <ProfileCard recipe={recipe} />
              </RecipeCard>
            </Link>
          ))}
      </Carousel>

    </>
  );
}

// REQUERIMENTOS: 26 , 27
