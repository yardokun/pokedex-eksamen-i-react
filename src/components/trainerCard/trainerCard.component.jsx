import "./trainerCard.styles.css";
import ashIcon from "../../assets/graphics/ash-ketchum.png";
import garyIcon from "../../assets/graphics/gary-oak.png";
import placeholderIcon from "../../assets/graphics/pokemonPlaceholder.png";

export default function TrainerCard({ name, age, trainerLevel, pokemons }) {
  function chooseTrainerIcon() {
    if (name === "Ash Ketchum") {
      return ashIcon;
    } else if (name === "Gary Oak") {
      return garyIcon;
    }
    return placeholderIcon;
  }

  function iconSize() {
    if (name === "Gary Oak") {
      return "50";
    }
    return "90";
  }

  return (
    <div className="trainer-card-container">
      <div className="card-background">
        <img src={chooseTrainerIcon()} width={iconSize()} alt={name} />
        <div className="card-content">
          <div className="card-text">
            <p className="text">Navn: {name}</p>
            <p className="text">Alder: {age}</p>
            <p className="text">Trenernivå: {trainerLevel}</p>
            <p className="text">Pokémons: {pokemons.join(", ")}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
