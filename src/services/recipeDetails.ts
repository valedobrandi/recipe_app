import { DrinksDataType, MealsDataType } from "../types/type";

export const reduceKeys = (
    value: MealsDataType | DrinksDataType,
    string: string
  ) => {
    const array = Object.keys(value).filter((key) => key.includes(string));
    return array.reduce((prev: string[], cur) => {
      if (value[cur] === null) return prev
      if (value[cur].length === 0) return prev
      prev.push(value[cur]);
      return prev;
    }, []);
  };


export const recipeDetails = (data: DrinksDataType[] | MealsDataType[], isMeals: boolean) => {
    return data.map((value) => {
      const ingredients = reduceKeys(value, "strIngredient");
      const measures = reduceKeys(value, "strMeasure");
      const video = value.strYoutube ? value.strYoutube : '';
      return {
        id: isMeals ? value.idMeal : value.idDrink,
        title: isMeals ? value.strMeal : value.strDrink,
        img: isMeals ? value.strMealThumb : value.strDrinkThumb,
        category: isMeals ? value.strCategory : value.strAlcoholic,
        area: isMeals ? value.strArea : '',
        ingredients,
        measures,
        instruction: value.strInstructions,
        video
      };
    });
  };