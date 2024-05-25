import { useNavigate } from "react-router-dom";
import { RecipeType } from "../../types/type";
import FilterByCategory from "../FilterByCategoryButtons";
import { ProfileCard } from "../ProfileCard";

type RecipesProps = {
  recipes: RecipeType[];
};

export default function Recipes({ recipes }: RecipesProps) {
  const navigate = useNavigate();
  return (
    <div className="mx-auto mb-40">
      <FilterByCategory />
      <div className="flex mx-auto justify-center gap-7
       flex-wrap mt-4 max-w-[1000px]">
        {recipes &&
          recipes.map((recipe: RecipeType) => (
            <div
              key={recipe.id}
              onClick={() => navigate(`${location.pathname}/${recipe.id}`)}
            >
              <ProfileCard recipe={recipe} />
            </div>
          ))}
      </div>
    </div>
  );
}
