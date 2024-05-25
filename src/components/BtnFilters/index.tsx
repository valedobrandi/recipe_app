import all_recipes from "../../assets/all_recipe_logo.svg"
import meal_recipes from "../../assets/meal_recipe_logo.svg"
import drink_recipes from "../../assets/drink_rcipe_logo.svg"

type TypeBtnFiltersProps = {
  setFilter: (filter: string) => void
}


export default function BtnFilters({ setFilter }: TypeBtnFiltersProps) {
  return (
    <div className=" flex justify-center my-8 lg:gap-12 gap-8 ">
      <button
      className="lg:border-8 border-2 rounded-full border-yellow-700"
        onClick={() => setFilter('all')}
        data-testid="filter-by-all-btn">
        <img src={all_recipes} alt="all recipes" className="lg:w-[100px] p-3"/>
      </button>
      <button
      className="lg:border-8 border-2 rounded-full border-yellow-700"
        onClick={() => setFilter('meal')}
        data-testid="filter-by-meal-btn">
          <img src={meal_recipes} alt="all recipes" className="lg:w-[100px] px-[13px]"/>
        </button>
      <button
      className="lg:border-8 border-2 rounded-full border-yellow-700"
        onClick={() => setFilter('drink')}
        data-testid="filter-by-drink-btn">
           <img src={drink_recipes} alt="all recipes" className="lg:w-[100px] lg:h-[80px] px-[20px]"/>
        </button>
    </div>
  )
}