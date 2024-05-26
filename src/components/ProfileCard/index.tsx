import {
  Card,
  Typography,
} from "@material-tailwind/react";
import { RecipeType } from "../../types/type";
type ProfileCardPropsType = {
  recipe: RecipeType;
}
export function ProfileCard({ recipe }: ProfileCardPropsType) {
  const { title, img } = recipe

  return (
    <Card
      data-testid="bg-card-image"
      style={{ backgroundImage: `url(${img})` }}
      className="relative lg:w-60 lg:h-60 w-40 h-40 m-auto mb-8 bg-cover
       flex justify-center cursor-pointer">
        <div className="absolute inset-0 bg-black opacity-20"></div>
      <Typography
        variant="h6"
        color="blue-gray"
        className=" relative p-2 uppercase h-16
         text-white lg:text-2xl
         overflow-hidden text-clip"
        style={
          { textShadow: '2px 2px 6px rgba(0, 0, 0, 1)' }
        }
      >
        {title}
      </Typography>
    </Card>
  );
}

