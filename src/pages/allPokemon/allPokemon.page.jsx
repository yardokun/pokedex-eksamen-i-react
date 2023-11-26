import { useState, useEffect } from "react";
import { useFavorites } from "../../hooks/useFavorites";
import PageContainer from "../../components/pageContainer/pageContainer";
import PokemonCard from "../../components/pokemonCard/pokemonCard.component";
import Title from "../../components/title/title.component";
import IconLink from "../../components/iconLink/iconLink.component";
import { path, routes } from "../../routing/endpoints";
import "./allPokemon.styles.css";
import Searchbar from "../../components/searchbar/searchbar.component";

export default function AllPokemon() {
  const [pokemonList, setPokemonList] = useState([]);
  const [filteredPokemonList, setFilteredPokemonList] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [error, setError] = useState(null);
  const { favorites, toggleFavorite } = useFavorites();

  useEffect(() => {
    const url = `${path}${routes.getPokemon}`;

    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setPokemonList(data);
        setError(null);
      })
      .catch((error) => {
        console.error("Error:", error);
        setError("Kunne ikke laste Pokémon-data.");
      });
  }, []);

  useEffect(() => {
    const filtered = pokemonList.filter((pokemon) =>
      pokemon.navn.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredPokemonList(filtered);
  }, [searchTerm, pokemonList]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const deletePokemon = (pokemonId) => {
    const url = `${path}/pokemon/${pokemonId}`;

    fetch(url, {
      method: "DELETE",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        setPokemonList(
          pokemonList.filter((pokemon) => pokemon._id !== pokemonId)
        );
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <PageContainer>
      <Searchbar value={searchTerm} onChange={handleSearchChange} />
      <Title title="Alle Pokémon" />
      {error && <p className="error-message">{error}</p>}
      {pokemonList.length === 0 && !searchTerm && !error && (
        <div className="no-data-message">
          Du har ikke lagt til noen pokémon enda. Gå til{" "}
          <a href="/addPokemon">Legg til Pokémon</a>-siden for å legge til nye
          Pokémon.
        </div>
      )}
      {searchTerm && filteredPokemonList.length === 0 && !error && (
        <div className="no-data-message">
          Ingen Pokémon funnet. Prøv et annet søkeord.
        </div>
      )}
      {(searchTerm ? filteredPokemonList : pokemonList).map((pokemon) => (
        <PokemonCard
          key={pokemon._id}
          icon={pokemon.navn}
          name={pokemon.navn}
          type={pokemon.type}
          level={pokemon.nivå}
          trainer={pokemon.trener}
          pokemon={pokemon}
          favIcon={favorites[pokemon.navn] ? "faved" : "unfaved"}
          onToggleFavorite={() => toggleFavorite(pokemon)}
          onDelete={deletePokemon}
        />
      ))}
      <div className="icon-links-container">
        <IconLink icon="allPokemon" size="60" />
        <IconLink icon="addPokemon" size="60" />
        <IconLink icon="myFavorites" size="70" />
      </div>
    </PageContainer>
  );
}
