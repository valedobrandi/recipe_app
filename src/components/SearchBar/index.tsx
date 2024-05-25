import {
  Navbar,
  Typography,
  List,
  Card,
  Checkbox,
} from "@material-tailwind/react";
import { Button, Form, InputGroup } from "react-bootstrap";
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

    <Navbar
      color="transparent"
      className="mx-auto max-w-screen-xl"
    >
      <div className="gap-4 text-white">
        <div className="relative flex items-center m-auto w-full md:w-max border-none">
          <InputGroup className="mb-3">
            <Form.Control
              disabled={radio === "Random recipe"}
              onChange={({ target }) =>
                setFormData({ ...formData, input: target.value })
              }
              type="search"
              color="black"
              placeholder="Search here..."
              className="p-4"
            />
            <Button
              variant="warning"
              size="lg"
              type="button"
              onClick={handleSubmit}
            >
              Search
            </Button>
          </InputGroup>
        </div>
        <Card className="w-full max-w-fit m-auto bg-transparent p-2 bg-deep-purple-900">
          <List className="lg:flex-row flex">
            <Checkbox
              color="amber"
              checked={radio === "Ingredient"}
              name="Ingredient"
              onChange={({ target }) =>
                setFormData({ ...formData, radio: target.name })
              }
              label={
                <div>
                  <Typography color="yellow"
                   className="font-bold uppercase tracking-wider lg:text-lg text-sm">
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
                  <Typography color="yellow"
                    className="font-bold uppercase tracking-wider lg:text-lg text-sm">
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
                  <Typography color="yellow"
                   className="font-bold uppercase tracking-wider lg:text-lg text-sm">
                    Random recipe
                  </Typography>
                </div>
              }
            />
          </List>
        </Card>
      </div>
    </Navbar>

  );
}



