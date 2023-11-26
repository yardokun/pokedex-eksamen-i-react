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
  pokemon,
  favIcon,
  onToggleFavorite,
  onDelete,
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

  return (
    <div className="pokemon-card-container">
      {<img src={choosePokemonIcon()} width="80" alt={icon} />}
      <div className="card-background">
        <p className="text">Navn: {name}</p>
        <p className="text">Type: {type}</p>
        <p className="text">Nivå: {level}</p>
        <p className="text">Trener: {trainer}</p>
        <img
          src={favIcon === "faved" ? favedIcon : unfavedIcon}
          width="50"
          alt="Favorite Icon"
          onClick={() => onToggleFavorite(name)}
        />
        <button className="delete-pokemon-btn" onClick={() => onDelete(pokemon._id)}>Slett</button>
      </div>
    </div>
  );
}
