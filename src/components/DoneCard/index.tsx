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

  const textStyle = {
    textShadow: '2px 2px 6px rgba(0, 0, 0, 1)',
    color: 'white',
  }



  return (

    <div className="flex mx-auto justify-center gap-7
    flex-wrap mt-4 max-w-[1000px]">
      {recipe.map(({ id, alcoholicOrNot, category, doneDate, image, name, nationality, tags, type, detailLink }) => {
        const isMeal = type === 'meal';
        const date = new Date(doneDate).toLocaleDateString('en-US')
        return (
          <Card className="relative w-72 h-72  mb-8 bg-cover
          flex-col justify-between rounded-lg"
            style={{ backgroundImage: `url(${image})` }}
            key={id}>
            <div className="absolute inset-0 bg-black opacity-20"></div>
            <div className="flex gap-8 p-2">
              <p
                className="relative text-2xl font-bold overflow-hidden text-clip h-9"
                style={textStyle}
                onClick={() => handleClickNavigate(type, id)}
              >
                {name}
              </p>
            </div>
            {isMeal ?
              <p
                style={textStyle}
                className="relative mt-2 ml-2 font-bold">{nationality} - {category}</p>
              : <p className="mt-2 font-bold"></p>}
            <div className="flex gap-1 justify-center mt-2 overflow-hidden p-2">
              {isMeal && tags.slice(0, 4).map((tag, index) => (
                <p
                  key={index}
                  className="bg-light-green-900  mt-1 text-sm rounded-lg
                     text-center p-2 text-white overflow-hidden"
                >{tag}</p>))}
            </div>
            {!isMeal && <p
              className="bg-light-green-900  mt-1 text-sm rounded-lg
              text-center p-2 text-white overflow-hidden"
            >{alcoholicOrNot}</p>}
            <div className="flex justify-between items-center p-2">
              <button
                className="p-2 mt-1"
                onClick={() => writeClipboardText(detailLink)}
              >
                <img src={share_icon} className="relative w-8" alt="share url" />
              </button>
              <p
                style={textStyle}
                className="relative text-lg font-bold ml-2 lg:text-xl"
              >
                Done in: {date}
              </p>
            </div>
          </Card>
        )
      })}
    </div>


  );
}
