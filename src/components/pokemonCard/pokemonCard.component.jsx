import "./pokemonCard.styles.css";
import bulbasaurIcon from "../../assets/graphics/bulbasaur.png";
import charizardIcon from "../../assets/graphics/charizard.png";
import wartortleIcon from "../../assets/graphics/wartortle.png";
import eeveeIcon from "../../assets/graphics/eevee.png";
import pikachuIcon from "../../assets/graphics/pikachu.png";
import butterfreeIcon from "../../assets/graphics/butterfree.png";
import favedIcon from "../../assets/graphics/myFavoritesIcon.png";
import unfavedIcon from "../../assets/graphics/myFavoritesIconBlackWhite.png";

export default function PokemonCard({
  icon,
  name,
  type,
  level,
  trainer,
  favIcon,
  toggleFavorite,
}) {
  function choosePokemonIcon() {
    if (icon === "bulbasaur") {
      return bulbasaurIcon;
    } else if (icon === "charizard") return charizardIcon;
    else if (icon === "wartortle") return wartortleIcon;
    else if (icon === "eevee") return eeveeIcon;
    else if (icon === "pikachu") return pikachuIcon;
    else if (icon === "butterfree") return butterfreeIcon;
  }

  function getFavoriteIcon() {
    return favIcon === "faved" ? favedIcon : unfavedIcon;
  }
  return (
    <div className="pokemon-card-container">
      {<img src={choosePokemonIcon()} width="80" alt={icon} />}
      <div className="card-background">
        <p className="text">Navn: {name}</p>
        <p className="text">Type: {type}</p>
        <p className="text">Nivå: {level}</p>
        <p className="text">Trener: {trainer}</p>
        <img
          src={getFavoriteIcon()}
          width="20"
          alt={favIcon}
          onClick={toggleFavorite}
        />
      </div>
    </div>
  );
}
