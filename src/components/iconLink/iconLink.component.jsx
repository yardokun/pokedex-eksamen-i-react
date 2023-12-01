import { Link } from "react-router-dom";
import "./iconLink.styles.css";
import allPokemonIcon from "../../assets/graphics/pokemonball.png";
import addPokemonIcon from "../../assets/graphics/pokemonPencil.png";
import myFavoritesIcon from "../../assets/graphics/pokemonFavorite.png";

export default function IconLink({ icon, text, size }) {
  function chooseIcon() {
    if (icon === "allPokemon") {
      return allPokemonIcon;
    } else if (icon === "addPokemon") return addPokemonIcon;
    else if (icon === "myFavorites") return myFavoritesIcon;
  } 

  const iconSize = size || "90";

  return (
    <Link className="icons-container" to={`/${icon}`}>
      {<img className="icon" src={chooseIcon()} width={iconSize} alt={icon} />}
      <p>{text}</p>
    </Link>
  );
}
