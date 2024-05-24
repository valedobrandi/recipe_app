import { useContext, useEffect, useState } from "react";
import { recipeDetails } from "../../services/recipeDetails";
import { DataType, RecipeDetailType } from "../../types/type";
import { useLocation, useParams } from "react-router-dom";

import UniqueRecipeContext from "../../Context/UniqueRecipeContext";
import DetailTitleImage from "../DetailTitleImage";
import IngredientsTable from "../IngredientsTable";
import RecipeVideo from "../RecipeVideo";
import CheckboxIngredients from "../CheckboxIngredients";
import { Card, List } from "@material-tailwind/react";
import Loading from "../Loading";

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
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>();
  const { id } = useParams();
  const location = useLocation();
  const { onSetRecipeDetail, recipeDetail: data } = useContext(UniqueRecipeContext);
  const isValid = location.pathname.includes("meals");

  const path = isValid ? "themealdb" : "thecocktaildb";

  const dataRecipe: DataType = data ? data : [];

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(`https://www.${path}.com/api/json/v1/1/lookup.php?i=${id}`);
        const data = await response.json();
        onSetRecipeDetail(data);

      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
          console.log(err);
        }
      } finally {
        setLoading(false);
      }
    };
    fetchData()
  }, []);



  let recipeDetail: RecipeDetailType[] = []
  if ("meals" in dataRecipe && dataRecipe.meals) {
    recipeDetail = recipeDetails(dataRecipe.meals, true);

  }
  if ("drinks" in dataRecipe && dataRecipe.drinks) {
    recipeDetail = recipeDetails(dataRecipe.drinks, false);
  }

  if (loading) return (
  <div className="flex justify-center m-20">
  <Loading />
  </div>
);
  if (error) return <p>{error}</p>

  return (
    <>
      {recipeDetail &&
        recipeDetail.map((recipe) => {
          const setInstructions = recipe.instruction.includes("STEP") ? recipe.instruction.split("STEP") : recipe.instruction.split(".")
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


