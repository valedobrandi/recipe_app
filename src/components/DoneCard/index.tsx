import { useNavigate } from "react-router-dom";
import { FavoriteType } from "../../types/type";
import { writeClipboardText } from "../../utils/writeClipboardText";
import share_icon from "../../assets/Share.svg"
import { Card } from "@material-tailwind/react";

type DoneCard = {
  recipe: FavoriteType[];
};


export default function DoneCard({ recipe }: DoneCard) {
  const navigate = useNavigate()

  const handleClickNavigate = (type: string, id: string) => {
    if (type === 'meal') { return navigate(`/meals/${id}`) }
    if (type === 'drink') { return navigate(`/drinks/${id}`) }
  }


  return (

    <div className="my-6 lg:ml-36 lg:mr-36 flex flex-wrap gap-6 justify-center mb-40 p-2">
      {recipe.map(({ id, alcoholicOrNot, category, doneDate, image, name, nationality, tags, type, detailLink }) => {
        const isMeal = type === 'meal';
        const date = new Date(doneDate).toLocaleDateString('en-US')
        return (
          <Card className="lg:w-[350px] h-auto
             mb-5 p-0 flex bg-light-blue-50
             rounded-lg mx-auto flex-wrap"
            key={id}>
            <img
              className="rounded-lg"
              onClick={() => handleClickNavigate(type, id)}
              src={image} alt={name} />
            <div className="">
              <div className="flex gap-8 justify-center">
                <p
                  className="text-2xl font-bold overflow-hidden text-clip h-9"
                  onClick={() => handleClickNavigate(type, id)}
                >
                  {name}</p>
              </div>
              {isMeal ?
                <p className="mt-2 ml-2">{nationality} - {category}</p>
                : <p className="h-[24px] mt-2"></p>}
              <p
                className="text-lg font-bold ml-2"
              >
                Done in: {date}
              </p>
              <div className="flex gap-3 justify-center mt-2 overflow-hidden">
                {isMeal && tags.slice(0, 4).map((tag, index) => (
                  <p
                    key={index}
                    className="bg-light-green-900  mt-1 text-sm rounded-lg
                     text-center p-2 text-white font-medium"
                  >{tag}</p>))}
              </div>
              {!isMeal && <p
                className="bg-light-green-900 text-sm rounded-lg
                 text-center p-1 mt-1 text-white font-medium"
              >{alcoholicOrNot}</p>}
            </div>
            <button
              className="p-2 mt-1"
              onClick={() => writeClipboardText(detailLink)}
            >
              <img src={share_icon} className="w-8" alt="share url" />
            </button>
          </Card>
        )
      })}
    </div>


  );
}
