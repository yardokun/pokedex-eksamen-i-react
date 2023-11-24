import { Link } from "react-router-dom";
import "./iconLink.styles.css";
import allPokemonIcon from "../../assets/graphics/allPokemonIcon.png";
import addPokemonIcon from "../../assets/graphics/addPokemonIcon.png";
import myFavoritesIcon from "../../assets/graphics/myFavoritesIcon.png";

export default function IconLink({ icon, text, size }) {
  function chooseIcon() {
    if (icon === "allPokemon") {
      return allPokemonIcon;
    } else if (icon === "addPokemon") return addPokemonIcon;
    else if (icon === "myFavorites") return myFavoritesIcon;
  }

  const iconSize = size || "60";

  return (
    <Link className="icons-container" to={`/${icon}`}>
      {<img src={chooseIcon()} width={iconSize} alt={icon} />}
      <p>{text}</p>
    </Link>
  );
}
