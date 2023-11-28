import "./pokemonCard.styles.css";
import bulbasaurIcon from "../../assets/graphics/bulbasaur.png";
import charizardIcon from "../../assets/graphics/charizard.png";
import wartortleIcon from "../../assets/graphics/wartortle.png";
import eeveeIcon from "../../assets/graphics/eevee.png";
import pikachuIcon from "../../assets/graphics/pikachu.png";
import butterfreeIcon from "../../assets/graphics/butterfree.png";
import favedIcon from "../../assets/graphics/pokemonFavorite.png";
import unfavedIcon from "../../assets/graphics/pokemonFavoriteBlackWhite .png";
import EditPokemonModal from "../editPokemonModal.component";

export default function PokemonCard({
  icon,
  name,
  type,
  level,
  baseEvolution,
  midEvolution,
  fullEvolution,
  trainerId,
  pokemon,
  favIcon,
  onToggleFavorite,
  onDelete,
  onEdit,
  isEditing,
  onSaveEdit,
  onCancelEdit,
  onRemoveFavorite,
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

  if (isEditing) {
    return (
      <EditPokemonModal
        pokemon={pokemon}
        onSave={onSaveEdit}
        onCancel={onCancelEdit}
      />
    );
  }

  const handleDelete = () => {
    onDelete(pokemon._id);
    onRemoveFavorite && onRemoveFavorite(pokemon.navn);
  };

  return (
    <div className="pokemon-card-container">
      <div className="card-background">
        <img src={choosePokemonIcon()} width="90" alt={icon} />
        <div className="card-content">
          <div className="card-text">
            <p className="text">Navn: {name}</p>
            <p className="text">Type: {type}</p>
            <p className="text">Nivå: {level}</p>
            <p className="text">Base Evolusjon: {baseEvolution}</p>
            <p className="text">Mid Evolusjon: {midEvolution}</p>
            <p className="text">Full Evolusjon: {fullEvolution}</p>
            {trainerId && <p className="text">Trener ID: {trainerId}</p>}
          </div>
          <div className="card-actions">
            <button onClick={() => onEdit(pokemon)}>Rediger</button>
            <button onClick={handleDelete}>Slett</button>
            <img
              className="fav-icon"
              src={favIcon === "faved" ? favedIcon : unfavedIcon}
              width="50"
              alt="Favorite Icon"
              onClick={() => onToggleFavorite(name)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
