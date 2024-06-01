import {
    Card,
} from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";

type RecipeCardPropsType = {
    children: React.ReactNode;
    img: string;
    id: string;
}
export function RecipeCard({ children, img, id }: RecipeCardPropsType) {
    const navigate = useNavigate();
    return (
        <div
            onClick={() => navigate(`${location.pathname}/${id}`)}
        >
            <Card
                data-testid="bg-card-image"
                style={{ backgroundImage: `url(${img})` }}
                className="relative lg:w-60 lg:h-60 w-40 h-40 m-auto mb-8 bg-cover
         flex justify-center cursor-pointer rounded-lg">
                <div className="absolute inset-0 bg-black opacity-20 rounded-lg"></div>
                {children}
            </Card>
        </div>
    );
}