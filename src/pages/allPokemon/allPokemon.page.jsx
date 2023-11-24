import PageContainer from "../../components/pageContainer/pageContainer";
import PokemonCard from "../../components/pokemonCard/pokemonCard.component";
import { useState } from "react";
import Title from "../../components/title/title.component";
import IconLink from "../../components/iconLink/iconLink.component";

export default function AllPokemon() {
  const [favorites, setFavorites] = useState({}); // Object to store favorites

  const toggleFavorite = (pokemonName) => {
    setFavorites((prevFavorites) => {
      const newFavorites = { ...prevFavorites };
      if (newFavorites[pokemonName]) {
        delete newFavorites[pokemonName]; // Remove from favorites
      } else {
        newFavorites[pokemonName] = true; // Add to favorites
      }
      return newFavorites;
    });
  };

  return (
    <PageContainer>
      <Title title="Alle Pokémon" />
      <PokemonCard
        icon="bulbasaur"
        name="Bulbasaur"
        type="Gress"
        level="0001"
        trainer="Ash Ketchum"
        favIcon={favorites["Bulbasaur"] ? "faved" : "unfaved"}
        toggleFavorite={() => toggleFavorite("Bulbasaur")}
      />
      <PokemonCard
        icon="charizard"
        name="Charizard"
        type="Brann"
        level="0006"
        trainer="Gary Oak"
        favIcon={favorites["Charizard"] ? "faved" : "unfaved"}
        toggleFavorite={() => toggleFavorite("Charizard")}
      />
      <PokemonCard
        icon="wartortle"
        name="Wartortle"
        type="Vann"
        level="0008"
        trainer="Gary Oak"
        favIcon={favorites["Wartortle"] ? "faved" : "unfaved"}
        toggleFavorite={() => toggleFavorite("Wartortle")}
      />
      <PokemonCard
        icon="eevee"
        name="Eevee"
        type="Normal"
        level="0133"
        trainer="Ingen"
        favIcon={favorites["Eevee"] ? "faved" : "unfaved"}
        toggleFavorite={() => toggleFavorite("Eevee")}
      />
      <PokemonCard
        icon="pikachu"
        name="Pikachu"
        type="Elektrisitet"
        level="0025"
        trainer="Ash Ketchum"
        favIcon={favorites["Pikachu"] ? "faved" : "unfaved"}
        toggleFavorite={() => toggleFavorite("Pikachu")}
      />
      <PokemonCard
        icon="butterfree"
        name="Butterfree"
        type="Insekt"
        level="0012"
        trainer="Ingen"
        favIcon={favorites["Butterfree"] ? "faved" : "unfaved"}
        toggleFavorite={() => toggleFavorite("Butterfree")}
      />
      <div className="icon-links-container">
        <IconLink icon="allPokemon" size="40" />
        <IconLink icon="addPokemon" size="40" />
        <IconLink icon="myFavorites" size="40" />
      </div>
    </PageContainer>
  );
}
