import DetailTitleImage from "../DetailTitleImage";
import IngredientsTable from "../IngredientsTable";
import RecipeVideo from "../RecipeVideo";
import CheckboxIngredients from "../CheckboxIngredients";
import { Card, List } from "@material-tailwind/react";
import useSearchRecipeById from "../../Hooks/useSearchRecipeById";
import { useParams } from "react-router-dom";

type DetailsRecipeProps = {
  checkBox: boolean;
  handleCheckBox?: (ingredient: number, id: string) => void,
  checkList?: number[]
};



export default function DetailsRecipe({
  checkBox,
  handleCheckBox = () => { },
  checkList = [],
}: DetailsRecipeProps) {

  const { id } = useParams();
  const { error, recipeDetail } = useSearchRecipeById(id)



  if (error) return <p>{error.message}</p>

  return (
    <>
      {recipeDetail &&
        recipeDetail.map((recipe) => {

          const setInstructions = recipe.instruction.includes("STEP")
            ? recipe.instruction.split("STEP")
            : recipe.instruction.split(".")

          return (
            <div key={recipe.id}>
              <DetailTitleImage {...recipe} />
              <div className="ingredients">
                {checkBox && (
                  <Card className="mt-6 flex flex-col items-center p-2">
                    <List>
                      {recipe.ingredients
                        .filter((box) => box.length > 0)
                        .map((ingredient, index) => {
                          const isChecked = checkList.includes(index)
                          const measures = recipe.measures.map((measure) => measure)
                          return (
                            <CheckboxIngredients
                              key={index}
                              measures={measures}
                              isChecked={isChecked}
                              index={index}
                              id={recipe.id}
                              handleCheckBox={handleCheckBox}
                              ingredient={ingredient} />
                          )
                        })}
                    </List>
                  </Card>
                )
                }
                {!checkBox && <IngredientsTable ingredients={recipe.ingredients} measures={recipe.measures} />}
              </div>
              <div className="p-10">
                {setInstructions.map((steps, index) => (
                  <p key={index} className="mb-3 lg:mx-12 lg:text-xl text-black-500 dark:text-gray-400">{steps}</p>))}
              </div>
              <RecipeVideo video={recipe.video} />
            </div>)
        })}
    </>
  );
}


