import {
  Navbar,
  Button,
  Input,
  ListItemPrefix,
  Typography,
  ListItem,
  Radio,
  List,
  Card,
} from "@material-tailwind/react";
import { useContext, useState } from "react";
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
    <div className="w-full m-auto">
      <Navbar
        variant="gradient"
        color="transparent"
        className="mx-auto max-w-screen-xl px-1 py-3"
      >
        <div className="flex flex-wrap items-center justify-between gap-y-4 text-white">
          <div className="" />
          <div className="relative flex m-auto w-full md:w-max">
            <Input
              onChange={({ target }) =>
                setFormData({ ...formData, input: target.value })
              }
              type="search"
              color="black"
              label="Search here..."
              className="pr-20"
              containerProps={{
                className: "min-w-[320px] h-16",
              }}
            />
            <Button
              onClick={handleSubmit}
              size="sm"
              color="yellow"
              className="!absolute right-1 top-1 rounded h-14"
            >
              Search
            </Button>
          </div>
          <Card className="w-full max-w-[36rem] m-auto bg-transparent p-2 bg-deep-purple-900">
      <List className="flex-row">
        <ListItem className="p-0">
          <label
            htmlFor="horizontal-list-react"
            className="flex w-full cursor-pointer items-center px-3 py-2"
          >
            <ListItemPrefix className="mr-3">
              <Radio
                color="amber"
                name="horizontal-list"
                id="horizontal-list-react"
                ripple={false}
                className="hover:before:opacity-0"
                containerProps={{
                  className: "p-0",
                }}
              />
            </ListItemPrefix>
            <Typography
              color="blue-gray"
              className=" text-white text-sm font-bold"
            >
              Ingredient
            </Typography>
          </label>
        </ListItem>
        <ListItem className="p-0">
          <label
            htmlFor="horizontal-list-vue"
            className="flex w-full cursor-pointer items-center px-3 py-2 font-bold"
          >
            <ListItemPrefix className="mr-3">
              <Radio 
                color="amber"
                name="horizontal-list"
                id="horizontal-list-vue"
                ripple={false}
                className="hover:before:opacity-0"
                containerProps={{
                  className: "p-0",
                }}
              />
            </ListItemPrefix>
            <Typography
              color="blue-gray"
              className="text-white text-sm font-bold"
            >
              Name
            </Typography>
          </label>
        </ListItem>
        <ListItem className="p-0">
          <label
            htmlFor="horizontal-list-svelte"
            className="flex w-full cursor-pointer items-center px-3 py-2"
          >
            <ListItemPrefix className="mr-3">
              <Radio
                color="amber"
                name="horizontal-list"
                id="horizontal-list-svelte"
                ripple={false}
                className="hover:before:opacity-0"
                containerProps={{
                  className: "p-0",
                }}
              />
            </ListItemPrefix>
            <Typography
              color="blue-gray"
              className="text-white text-sm font-bold"
            >
              First letter
            </Typography>
          </label>
        </ListItem>
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