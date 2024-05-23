import {
  Navbar,
  Input,
  Typography,
  List,
  Card,
  Checkbox,
} from "@material-tailwind/react";
import { Button } from "react-bootstrap";
import { useContext, useState } from "react";
import { useLocation } from "react-router-dom";
import MealsContext from "../../Context/MealsContext";
import DrinksContext from "../../Context/DrinksContext";


export default function SearchBar() {
  const form = { radio: "Name", input: "" };
  const [formData, setFormData] = useState(form);
  const { radio, input } = formData;
  const { handleFetch: fetchMeals } = useContext(MealsContext);
  const { handleFetch: fetchDrinks } = useContext(DrinksContext);
  const location = useLocation();
  
  const handleSubmit = () => {
    switch (location.pathname) {
      case "/meals":
        return fetchMeals(radio, input);
      case "/drinks":
        return fetchDrinks(radio, input)
      default:
        break;
    }
  };

  return (
    <div className="w-full m-auto">
      <Navbar
        color="transparent"
        className="mx-auto max-w-screen-xl px-1 py-3"
      >
        <div className="flex flex-wrap items-center justify-between gap-y-4 text-white">
          <div className="" />
          <div className="relative flex m-auto w-full md:w-max">
            <Input
              disabled={radio === "Random recipe"}
              onChange={({ target }) =>
                setFormData({ ...formData, input: target.value })
              }
              type="search"
              color="black"
              label="Search here..."
              className="pr-20 border-none"
              containerProps={{
                className: "min-w-[320px] h-16",
              }}
            />
            <Button
              variant="warning"
              size="lg"
              type="button"
              onClick={handleSubmit}
              className="!absolute right-1 top-1 rounded h-14"
            >
              Search
            </Button>
          </div>
          <Card className="w-full max-w-fit m-auto bg-transparent p-2 bg-deep-purple-900">
            <List className="flex-row">
              <Checkbox
                color="amber"
                checked={radio === "Ingredient"}
                name="Ingredient"
                onChange={({ target }) =>
                  setFormData({ ...formData, radio: target.name })
                }
                label={
                  <div>
                    <Typography color="yellow" className="font-bold uppercase tracking-wider">
                      Ingredient
                    </Typography>
                  </div>
                }
              />
              <Checkbox
                color="amber"
                checked={radio === "Name"}
                name="Name"
                onChange={({ target }) =>
                  setFormData({ ...formData, radio: target.name })
                }
                label={
                  <div>
                    <Typography color="yellow" className="font-bold uppercase tracking-wider">
                      Name
                    </Typography>
                  </div>
                }
              />
              <Checkbox
                color="amber"
                checked={radio === "Random recipe"}
                name="Random recipe"
                onChange={({ target }) =>
                  setFormData({ ...formData, radio: target.name })
                }
                label={
                  <div>
                    <Typography color="yellow" className="font-bold uppercase tracking-wider">
                      Random recipe
                    </Typography>
                  </div>
                }
              />
            </List>
          </Card>
        </div>
      </Navbar>
    </div>
  );
}



/* import { useContext, useState } from "react";
import { useLocation } from "react-router-dom";
import MealsContext from "../../Context/MealsContext";
import DrinksContext from "../../Context/DrinksContext";

export default function SearchBar() {
  const form = { radio: "name", input: "" };
  const [formData, setFormData] = useState(form);
  const { radio, input } = formData;
  const { handleFetch: fetchMeals } = useContext(MealsContext);
  const { handleFetch: fetchDrinks } = useContext(DrinksContext);
  const location = useLocation();



  const handleSubmit = () => {
    switch (location.pathname) {
      case "/meals":
        return fetchMeals(radio, input);
      case "/drinks":
        return fetchDrinks(radio, input)
      default:
        break;
    }

  };


  return (
    <form>
      <h4>Search Bar</h4>
      <input
        data-testid="search-input"
        type="text"
        onChange={({ target }) =>
          setFormData({ ...formData, input: target.value })
        }
      />
      <label htmlFor="">Ingredient</label>
      <input
        checked={formData.radio === "ingredient"}
        onChange={({ target }) =>
          setFormData({ ...formData, radio: target.name })
        }
        data-testid="ingredient-search-radio"
        type="radio"
        name="ingredient"
      />
      <label htmlFor="">Name</label>
      <input
        checked={formData.radio === "name"}
        onChange={({ target }) =>
          setFormData({ ...formData, radio: target.name })
        }
        data-testid="name-search-radio"
        type="radio"
        name="name"
      />
      <label htmlFor="">First letter</label>
      <input
        checked={formData.radio === "firstLetter"}
        onChange={({ target }) =>
          setFormData({ ...formData, radio: target.name })
        }
        data-testid="first-letter-search-radio"
        type="radio"
        name="firstLetter"
        id=""
      />
      <button
        type="button"
        data-testid="exec-search-btn"
        onClick={handleSubmit}
      >
        Search
      </button>
    </form>
  );
}

 */