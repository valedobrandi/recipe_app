import { MealsDataType } from "../types/type";

const filterDataKeys = (data: MealsDataType[]) => {
  return data.map((value) => {
    return {
      id: value.idMeal,
      title: value.strMeal,
      img: value.strMealThumb,
      categories: value.strCategory,
    };
  });
};

export default filterDataKeys;