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

    <div className="my-6 lg:ml-36 lg:mr-36 flex flex-wrap gap-6 justify-center mb-40 ">
      {recipe.map(({ id, alcoholicOrNot, category, doneDate, image, name, nationality, tags, type, detailLink }) => {
        const isMeal = type === 'meal';
        const date = new Date(doneDate).toLocaleDateString('en-US')
        return (
          <Card className="lg:min-w-[500px] lg:h-auto w-fit h-auto
             mb-5 p-0 flex flex-row border-2 border-gray-500
              rounded-lg mx-auto flex-wrap" key={id}>
            <img
              className="lg:w-56 lg:h-auto lg:rounded-lg lg:self-start lg:ml-0 lg:p-0 w-auto h-fit self-center mx-auto p-2"
              onClick={() => handleClickNavigate(type, id)}
              data-testid="${index}-horizontal-image" src={image} alt="" />
            <div className=" lg:ml-6 mx-auto flex flex-col lg:justify-between items-center p-4 ">
              <div className="flex gap-6 justify-between">
                <p
                  className="text-2xl font-bold"
                  onClick={() => handleClickNavigate(type, id)}
                  data-testid="${index}-horizontal-name">{name}</p>
                <button
                  data-testid="${index}-horizontal-share-btn"
                  onClick={() => writeClipboardText(detailLink)}
                >
                  <img src={share_icon} className="w-8" alt="share url" />
                </button>
              </div>
              {isMeal && <p data-testid="${index}-horizontal-top-text">{nationality} - {category}</p>}
              <p
                className="text-sm font-bold"
              >
                Done in: {date}
              </p>
              <div className="lg:flex lg:gap-2">
                {isMeal && tags.map((tag, index) => (
                  <p
                    key={index}
                    className="bg-gray-400 mt-1 text-sm rounded-lg text-center p-[2px]"
                  >{tag}</p>))}
              </div>
              {!isMeal && <p
                className="bg-gray-400 text-sm rounded-lg text-center p-1 mt-1"
              >{alcoholicOrNot}</p>}
            </div>
          </Card>
        )
      })}
    </div>


  );
}
