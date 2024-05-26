import drink_icon from "../../assets/icone-bebida.svg"
import FavAndCopyBtn from "../FavAndCopyBtn";
import { useParams } from "react-router-dom";

type DetailTitleImageProps = {
    img: string;
    title: string;
    category: string;
}

export default function DetailTitleImage({ img, title, category }: DetailTitleImageProps) {
    const { id } = useParams();
    const paramsId = id ? id : ''
    return (
        <div
            className="relative overflow-hidden rounded-lg bg-cover
             bg-no-repeat p-12 text-center h-[280px] lg:h-[480px]"
            style={{ backgroundImage: `url(${img})` }}>
            <div
                className="absolute bottom-0 left-0 right-0 top-0 h-full w-full
                 overflow-hidden bg-fixed p-6"
                style={{ backgroundColor: "rgba(0, 0, 0, 0.6)" }}> 
                <div className="flex flex-col h-full">
                    <div className="text-white">
                        <div className="flex justify-between items-center" >
                            <div className="flex items-center">
                            <img src={drink_icon} alt="" className="w-12"/>
                            <h4 className="ml-6 text-xl lg:text-4xl font-semibold">{category}</h4>
                            </div>
                            <div className="flex items-center ">
                            <FavAndCopyBtn id={paramsId} />
                            </div>
                        </div>
                        <h2 className="mt-[100px] text-4xl lg:text-6xl font-semibold">{title}</h2>
                    </div>
                </div>
            </div >
        </div >
    )
}