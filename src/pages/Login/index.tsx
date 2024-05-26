
import {
  Card,
  Input,
  Typography,
} from "@material-tailwind/react";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import isEmail from 'validator/lib/isEmail';
import LogoRecipes from "../../assets/logo Recipes App.svg"
import LocalStoreContext from "../../Context/LocalStoreContext";
import { Button } from "react-bootstrap";

export default function Login() {
  const { setUserStore } = useContext(LocalStoreContext)
  const form = { email: "", password: "" };
  const [formData, setFormData] = useState(form)
  const navigate = useNavigate();

  const handleFormSubmit = () => {
    setUserStore({ email: formData.email })
    navigate("/meals", { state: { title: 'Meals', isSearch: true } });
  };

  const isDisable = isEmail(formData.email) && formData.password.length > 6;
  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <img src={LogoRecipes} alt="" />
      <Card color="transparent" shadow={false}>
        <Typography variant="h4" color="blue-gray">
          Login
        </Typography>
        <Typography color="gray" className="mt-1 font-normal">
          Nice to meet you! Enter or register.
        </Typography>
        <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
          <div className="mb-1 flex flex-col gap-6">
            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Your Email
            </Typography>
            <Input
              value={formData.email}
              onChange={({ target }) => setFormData({ ...formData, email: target.value })}
              size="lg"
              placeholder="xx@xx.com"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />
            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Password
            </Typography>
            <Input
              value={formData.password}
              onChange={({ target }) => setFormData({ ...formData, password: target.value })}
              type="password"
              size="lg"
              placeholder="7-digits"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />
          </div>
          <Button
            variant="warning"
            size="lg"
            type="button"
            disabled={!isDisable}
            data-testid="login-submit-btn"
            onClick={handleFormSubmit}
            className=" w-full mt-3"
            >
            sign up
          </Button>
          <Button
          variant="dark"
          size="lg"
          type="button"
          className="w-full mt-3"
          >
            Register
          </Button>
          <Button
            variant="success"
            size="lg"
            type="button"
            onClick={handleFormSubmit}
            className=" w-full mt-3"
            >
            Just Go!
          </Button>
        </form>
      </Card>
    </div>
  );
}
