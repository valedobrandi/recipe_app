import {
  Card,
  CardBody,
  Typography,
} from "@material-tailwind/react";
import { RecipeType } from "../../types/type";
type ProfileCardPropsType = {
  recipe: RecipeType;
}
export function ProfileCard({ recipe }: ProfileCardPropsType) {
  const { title, img } = recipe

  return (
    <Card className="lg:w-96 lg:h-auto w-40 h-40 p-3 ml-auto rou mr-auto mb-5 flex flex-col justify-center pb-0">
      <CardBody className="text-center">
      <img src={img} alt={title} className="rounded-lg"/>
        <Typography variant="h6" color="blue-gray" className="pt-2 m-2 lg:text-2xl">
          {title}
        </Typography>
      </CardBody>
    </Card>
  );
}