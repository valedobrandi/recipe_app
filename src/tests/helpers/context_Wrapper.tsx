import DrinksProvider from "../../Provider/DrinksProvider"
import LocalStoreProvider from "../../Provider/LocalStoreProvider"
import MealsProvider from "../../Provider/MealsProvider"
import UniqueRecipeProvider from "../../Provider/UniqueRecipeProvider"

const Wrapper = ({ children }: { children: React.ReactNode }) => {
    return (
        <LocalStoreProvider>
            <UniqueRecipeProvider>
                <MealsProvider>
                    <DrinksProvider>
                        { children }
                    </DrinksProvider>
                </MealsProvider>
            </UniqueRecipeProvider>
        </LocalStoreProvider>
    )
}

export default Wrapper;