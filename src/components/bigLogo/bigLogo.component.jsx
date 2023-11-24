import Logo from "../../assets/graphics/logo.png";
import { Link } from "react-router-dom";

export default function BigLogo() {
  return (
    <Link to="/">
      <img src={Logo} width="280" alt="bigLogo" />
    </Link>
  );
}
