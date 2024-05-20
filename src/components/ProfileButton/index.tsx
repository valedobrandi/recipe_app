import { useNavigate } from "react-router-dom";

type ProfileButtonPropsType = {
  logo: string;
  nav: string;
  title: string;
  onClearStore?: () => void;
}


export default function ProfileButton({ logo, nav, title, onClearStore = () => {} }: ProfileButtonPropsType) {
  const navigate = useNavigate()
  return (
    <div>
    <button
      className="flex items-center gap-12 w-[300px]"
      onClick={() => (navigate(nav), onClearStore())}>
      <img
        className="lg:w-16"
        src={logo} alt="" />
      <p
        className="lg:text-2xl"
      >{title}</p>
    </button>
    </div>
  )
}