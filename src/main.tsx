import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import MealsProvider from "./Provider/MealsProvider.tsx";
import DrinksProvider from "./Provider/DrinksProvider.tsx";
import UniqueRecipeProvider from "./Provider/UniqueRecipeProvider.tsx";
import LocalStoreProvider from "./Provider/LocalStoreProvider.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
 
    <BrowserRouter>
    <LocalStoreProvider>
      <UniqueRecipeProvider>
        <DrinksProvider>
          <MealsProvider>
            <App />
          </MealsProvider>
        </DrinksProvider>
      </UniqueRecipeProvider>
      </LocalStoreProvider>
    </BrowserRouter>
);
