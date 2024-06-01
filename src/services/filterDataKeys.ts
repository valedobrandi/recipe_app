import { DrinksDataType, MealsDataType } from '../types/type';


const filterDataKeys = (data: DrinksDataType[] | MealsDataType[]) => {
    return data.map((value) => {
      return {
        id: value.idDrink || value.idMeal,
        title: value.strDrink || value.strMeal,
        img: value.strDrinkThumb || value.strMealThumb,
        categories: value.strCategory,
      };
    });
  };

  export default filterDataKeys;