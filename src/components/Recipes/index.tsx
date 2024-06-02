
import { RecipeType } from "../../types/type";
import { ProfileCard } from "../ProfileCard";
import { RecipeCard } from "../RecipeCard";

type RecipesProps = {
  recipes: RecipeType[];
};

export default function Recipes({ recipes }: RecipesProps) {
  return (
    <div className="mx-auto mb-40">
      <div className="flex mx-auto justify-center gap-7
       flex-wrap mt-4 max-w-[1000px]">
        {recipes.map((recipe: RecipeType) => (
          <RecipeCard
            key={recipe.id}
            id={recipe.id}
            img={recipe.img}>
            <ProfileCard recipe={recipe} />
          </RecipeCard>
        ))}
      </div>
    </div>
  );
}
