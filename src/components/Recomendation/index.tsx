import { RecipeType } from "../../types/type";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { ProfileCard } from "../ProfileCard";

type TypeRecomendationProps = {
  recipes: RecipeType[]
  title?: boolean;

};

export default function Recomendation({
  recipes,

}: TypeRecomendationProps) {

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
          recipes.map((recipe, index) => (
              <ProfileCard key={index} recipe={recipe} />
          ))}
      </Carousel>

    </>
  );
}

// REQUERIMENTOS: 26 , 27
