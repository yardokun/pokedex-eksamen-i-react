import Logo from "../../assets/graphics/logo.png";
import { Link } from "react-router-dom";
import "./bigLogo.styles.css";

export default function BigLogo() {
  return (
    <Link className="bigLogo-container" to="/">
      <img src={Logo} width="280" alt="bigLogo" />
    </Link>
  );
}
