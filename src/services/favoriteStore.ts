import { DrinksDataType, MealsDataType } from "../types/type"

export const favoriteStore = (data: MealsDataType[] | DrinksDataType[], isMeal = false, url = '') => {
    const date = new Date().toDateString()

    
    return {
   id: isMeal ? data[0].idMeal : data[0].idDrink,
   type: isMeal ? 'meal' : 'drink',
   nationality: isMeal ? data[0].strArea : '',
   category: data[0].strCategory ? data[0].strCategory : '',
   alcoholicOrNot: isMeal ? '' : data[0].strAlcoholic,
   name: isMeal ? data[0].strMeal : data[0].strDrink,
   image: isMeal ? data[0].strMealThumb : data[0].strDrinkThumb,
   doneDate: date,
   tags: data[0].strTags ? data[0].strTags.split(",") : [''],
   detailLink: url
 }
 }

