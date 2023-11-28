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

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!navn || !type || !nivå || !trenerId) {
      alert("Du må fylle inn all informasjonen om din pokémon først!");
      return;
    }

    const url = `${path}/pokemon`;

    const pokemonData = { navn, type, nivå, trenerId };

    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(pokemonData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then(() => {
        setIsSubmitted(true);
        setName("");
        setType("");
        setLevel("");
        setTrenerId("");
      })
      .catch((error) => {
        console.error("Error:", error);
        setError("Det oppstod en feil ved innsending.");
        setIsSubmitted(false);
      });
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
