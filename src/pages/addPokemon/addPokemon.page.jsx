import { useContext } from "react";
import { TrainersContext } from "../../contexts/trainersContext";
import IconLink from "../../components/iconLink/iconLink.component";
import InputText from "../../components/inputText/inputText.component";
import PageContainer from "../../components/pageContainer/pageContainer";
import SelectTrainer from "../../components/selectTrainer/selectTrainer.component";
import Title from "../../components/title/title.component";
import { useState } from "react";
import { path } from "../../routing/endpoints";
import "./addPokemon.styles.css";

export default function AddPokemon() {
  const [navn, setName] = useState("");
  const [type, setType] = useState("");
  const [nivå, setLevel] = useState("");
  const [trenerId, setTrenerId] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState("");
  const { trainers } = useContext(TrainersContext);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!navn || !type || !nivå || !trenerId) {
      alert("Du må fylle inn all informasjonen om din Pokémon først!");
      return;
    }

    try {
      const url = `${path}/pokemon`;
      let response = await fetch(url);
      let existingPokemons = await response.json();

      // Sjekk om Pokémonen allerede eksisterer
      const existingPokemon = existingPokemons.find(
        (pokemon) => pokemon.navn.toLowerCase() === navn.toLowerCase()
      );

      if (existingPokemon) {
        alert("Denne Pokémonen eksisterer allerede!");
        return;
      }

      // Opprett en ny Pokémon
      const newPokemonData = { navn, type, nivå, trener: trenerId };
      response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newPokemonData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const newPokemon = await response.json();

      // Oppdater treneren med den nye Pokémonen
      const selectedTrainer = trainers.find(
        (trainer) => trainer._id === trenerId
      );
      if (selectedTrainer) {
        let updatedTrainerPokemons = selectedTrainer.pokemons
          ? [...selectedTrainer.pokemons, newPokemon._id]
          : [newPokemon._id];
        const updatedTrainer = {
          ...selectedTrainer,
          pokemons: updatedTrainerPokemons,
        };
        console.log("Updated Trainer Data:", updatedTrainer);
        response = await fetch(`${path}/trenere/${trenerId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updatedTrainer),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
      }

      setIsSubmitted(true);
      setName("");
      setType("");
      setLevel("");
      setTrenerId("");
    } catch (error) {
      console.error("Error:", error);
      setError("Det oppstod en feil ved innsending.");
      setIsSubmitted(false);
    }
  };

  return (
    <PageContainer>
      <div className="main-container">
        <Title title="Legg til din Pokémon" />
        <form onSubmit={handleSubmit}>
          <InputText
            text="Navn..."
            value={navn}
            onChange={(e) => setName(e.target.value)}
          />
          <InputText
            text="Type..."
            value={type}
            onChange={(e) => setType(e.target.value)}
          />
          <InputText
            text="Nivå..."
            value={nivå}
            onChange={(e) => setLevel(e.target.value)}
          />
          <SelectTrainer
            value={trenerId}
            onChange={(e) => setTrenerId(e.target.value)}
          />
          <button type="submit" className="add-pokemon-btn">
            Legg til
          </button>
        </form>
        {isSubmitted && (
          <p className="response-message">
            Din Pokémon ble lagt til i <a href="/allPokemon">Alle Pokémon</a>!
          </p>
        )}
        {error && <p className="error-message">{error}</p>}
        <div className="icon-links-container">
          <IconLink icon="allPokemon" size="60" />
          <IconLink icon="addPokemon" size="60" />
          <IconLink icon="myFavorites" size="70" />
        </div>
      </div>
    </PageContainer>
  );
}
