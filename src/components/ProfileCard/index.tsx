import {
  Typography,
} from "@material-tailwind/react";
import { RecipeType } from "../../types/type";
type ProfileCardPropsType = {
  recipe: RecipeType;
}
export function ProfileCard({ recipe }: ProfileCardPropsType) {
  const { title } = recipe

  return (

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

  );
}

