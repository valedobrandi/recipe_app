import { useNavigate } from "react-router-dom";
import { FavoriteType } from "../../types/type";
import { Card } from "@material-tailwind/react";
import FavAndCopyBtn from "../FavAndCopyBtn";

type FavCard = {
  recipe: FavoriteType[];
};

const textStyle = {
  textShadow: '2px 2px 6px rgba(0, 0, 0, 1)',
  color: 'white',
}


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
          <Card className="relative w-72 h-72 mb-8 bg-cover
          flex-col justify-between rounded-lg"
            style={{ backgroundImage: `url(${image})` }}
            key={id}
          >
            <div className="absolute inset-0 bg-black opacity-20"></div>
            <div className=" lg:ml-6 mx-auto flex flex-col justify-between items-center p-4 ">
              <div className="flex flex-wrap gap-6 items-center">
                <p
                  style={textStyle}
                  className="relative text-2xl font-bold cursor-pointer"
                  onClick={() => handleClickNavigate(type, id)}
                >
                  {name}
                </p>
                {isMeal && (
                  <p
                    className="relative"
                    style={textStyle}
                  >{nationality} - {category}</p>)}
                {!isMeal && <p
                  className="bg-light-green-900 text-sm rounded-lg
                   text-center p-1 mt-1 text-white font-medium relative"
                >{alcoholicOrNot}</p>}
              </div>
            </div>
            <div className="p-4">
              <FavAndCopyBtn id={id} />
            </div>
          </Card>
        )
      })}
    </div>


  );
}
