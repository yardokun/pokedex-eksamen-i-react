import "./pokemonCard.styles.css";
import bulbasaurIcon from "../../assets/graphics/bulbasaur.png";
import charizardIcon from "../../assets/graphics/charizard.png";
import wartortleIcon from "../../assets/graphics/wartortle.png";
import eeveeIcon from "../../assets/graphics/eevee.png";
import pikachuIcon from "../../assets/graphics/pikachu.png";
import butterfreeIcon from "../../assets/graphics/butterfree.png";
import favedIcon from "../../assets/graphics/pokemonFavorite.png";
import unfavedIcon from "../../assets/graphics/pokemonFavoriteBlackWhite .png";

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
    if (icon === "Bulbasaur") {
      return bulbasaurIcon;
    } else if (icon === "Charizard") return charizardIcon;
    else if (icon === "Wartortle") return wartortleIcon;
    else if (icon === "Eevee") return eeveeIcon;
    else if (icon === "Pikachu") return pikachuIcon;
    else if (icon === "Butterfree") return butterfreeIcon;
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
          width="50"
          alt={favIcon}
          onClick={toggleFavorite}
        />
      </div>
    </div>
  );
}
