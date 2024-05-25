import { useNavigate } from "react-router-dom";
import { FavoriteType } from "../../types/type";
import { Card } from "@material-tailwind/react";
import FavAndCopyBtn from "../FavAndCopyBtn";

type FavCard = {
  recipe: FavoriteType[];
};


export default function FavCard({ recipe }: FavCard) {
  const navigate = useNavigate()

  const handleClickNavigate = (type: string, id: string) => {
    if (type === 'meal') { return navigate(`/meals/${id}`) }
    if (type === 'drink') { return navigate(`/drinks/${id}`) }
  }


  return (
    <div className="my-6 lg:ml-36 lg:mr-36 flex flex-wrap gap-6 justify-center mb-28">
      {recipe.map(({ id, category, image, name, nationality, type, alcoholicOrNot }) => {
        const isMeal = type === 'meal';

        return (
          <Card className="lg:w-[350px] h-auto
            mb-5 p-0 flex bg-light-blue-50
             rounded-lg mx-auto flex-wrap" key={id}>
            <img
              className="lg:w-56 lg:h-auto lg:rounded-lg lg:self-start lg:ml-0 lg:p-0 w-auto h-fit self-center mx-auto"
              onClick={() => handleClickNavigate(type, id)}
              src={image} alt={name} />
            <div className=" lg:ml-6 mx-auto flex flex-col lg:justify-between items-center p-4 ">
              <div className="flex flex-wrap gap-6 justify-center lg:items-start items-center mb-4">
                <p
                  className="text-2xl font-bold"
                  onClick={() => handleClickNavigate(type, id)}
                >
                  {name}
                </p>
                {isMeal && <p>{nationality} - {category}</p>}
                {!isMeal && <p
                  className="bg-light-green-900 text-sm rounded-lg text-center p-1 mt-1 text-white font-medium"
                >{alcoholicOrNot}</p>}
              </div>
                <FavAndCopyBtn id={id} />
            </div>
          </Card>
        )
      })}
    </div>


  );
}
