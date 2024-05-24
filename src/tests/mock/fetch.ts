import detailMeal from "./detail_meal";
import mealCategories from "./categories_meal";
import meals from "./meals";
import drinkCategories from "./categories_drink";
import drinks from "./drinks";
import detailDrink from "./detail_drink";
import ordinary_drink_category from "./ordinary_drink_category";
import breakfast_meal_category from "./breakfast_meal_category";
import cake_meal_search from "./cake_meal_search";
import no_meal_search from "./no_meal_search";
import one_recipe_search from "./one_recipe_search";

const fetch_api = (URL: string | URL | Request) =>
  Promise.resolve({
    status: 200,
    ok: true,
    json: () => {
      if (URL === "https://www.themealdb.com/api/json/v1/1/list.php?c=list")
        return Promise.resolve(mealCategories);
      if (URL === "https://www.themealdb.com/api/json/v1/1/search.php?s=")
        return Promise.resolve(meals);
      if (URL === `https://www.themealdb.com/api/json/v1/1/filter.php?c=Breakfast`)
        return Promise.resolve(breakfast_meal_category);
      if (URL === `https://www.themealdb.com/api/json/v1/1/search.php?s=cake`)
        return Promise.resolve(cake_meal_search);
      if (URL === `https://www.themealdb.com/api/json/v1/1/filter.php?i=cake`)
        return Promise.resolve(cake_meal_search);
      if (URL === `https://www.themealdb.com/api/json/v1/1/search.php?s=one cake`)
        return Promise.resolve(one_recipe_search);
      if (URL === `https://www.themealdb.com/api/json/v1/1/random.php`)
        return Promise.resolve(one_recipe_search);
      if (URL === `https://www.themealdb.com/api/json/v1/1/search.php?s=no recipe`)
        return Promise.resolve(no_meal_search);
      if (URL === "https://www.themealdb.com/api/json/v1/1/lookup.php?i=52977")
        return Promise.resolve(detailMeal);
      if (URL === "https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list")
        return Promise.resolve(drinkCategories);
      if (URL === "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=")
        return Promise.resolve(drinks);
      if (URL === "https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=178319")
        return Promise.resolve(detailDrink);
      if (URL === `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=Ordinary Drink`)
        return Promise.resolve(ordinary_drink_category);
    },
  } as Response);

export default fetch_api;
