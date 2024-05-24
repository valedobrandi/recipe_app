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
     className="w-40 m-auto mb-8 flex justify-center ">
      <img src={img} alt={title} className="rounded-lg"/>
        <Typography variant="h6" color="blue-gray" className="p-2 lg:text-xl text-center uppercase">
          {title}
        </Typography>
    </Card>
  );
}