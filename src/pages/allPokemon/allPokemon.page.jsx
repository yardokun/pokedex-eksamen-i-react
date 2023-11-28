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
  const { favorites, toggleFavorite, removeFavorite } = useFavorites();
  const [editingPokemon, setEditingPokemon] = useState(null);
  const [isInitialized, setIsInitialized] = useState(false);

  const initPokemons = [
    {
      navn: "Charizard",
      type: "Ild",
      nivå: 50,
      baseEvolusjon: "0004",
      midEvolusjon: "0005",
      fullEvolusjon: null,
      trener: null,
    },
    {
      navn: "Pikachu",
      type: "Elektrisitet",
      nivå: 10,
      baseEvolusjon: "0172",
      midEvolusjon: null,
      fullEvolusjon: "0026",
      trener: null,
    },
    {
      navn: "Bulbasaur",
      type: "Gress",
      nivå: 13,
      baseEvolusjon: null,
      midEvolusjon: "0002",
      fullEvolusjon: "0003",
      trener: null,
    },
    {
      navn: "Wartortle",
      type: "Vann",
      nivå: 14,
      baseEvolusjon: "0007",
      midEvolusjon: null,
      fullEvolusjon: "0009",
      trener: null,
    },
    {
      navn: "Eevee",
      type: "Normal",
      nivå: 3,
      baseEvolusjon: "0133",
      midEvolusjon: null,
      fullEvolusjon: null,
      trener: null,
    },
    {
      navn: "Butterfree",
      type: "Insekt",
      nivå: 7,
      baseEvolusjon: "0010",
      midEvolusjon: "0011",
      fullEvolusjon: "0012",
      trener: null,
    },
  ];

  useEffect(() => {
    const fetchPokemons = async () => {
      console.log("Starter å hente Pokémon data...");

      try {
        const response = await fetch(`${path}${routes.getPokemon}`);
        let existingPokemons = await response.json();

        console.log("Mottok eksisterende Pokémon data:", existingPokemons);

        if (existingPokemons.length === 0 && !isInitialized) {
          console.log("Legger til initielle Pokémon...");

          for (const pokemon of initPokemons) {
            await fetch(`${path}/pokemon`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(pokemon),
            });
          }

          console.log("Initielle Pokémon lagt til.");

          setIsInitialized(true);

          const updatedResponse = await fetch(`${path}${routes.getPokemon}`);
          existingPokemons = await updatedResponse.json();

          console.log(
            "Oppdatert Pokémon liste etter tillegg:",
            existingPokemons
          );
        }

        setPokemonList(existingPokemons);
      } catch (error) {
        console.error("Error ved henting av Pokémon data:", error);
        setError("Kunne ikke laste Pokémon-data.");
      }
    };

    if (!isInitialized) {
      fetchPokemons();
    }
  }, [isInitialized]);

  useEffect(() => {
    const filtered = pokemonList.filter((pokemon) =>
      pokemon.navn.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredPokemonList(filtered);
  }, [searchTerm, pokemonList]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const deletePokemon = (pokemonId, pokemonName) => {
    const url = `${path}/pokemon/${pokemonId}`;
    fetch(url, { method: "DELETE" })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        setPokemonList(
          pokemonList.filter((pokemon) => pokemon._id !== pokemonId)
        );
        removeFavorite(pokemonName);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const handleEdit = (pokemon) => {
    setEditingPokemon(pokemon);
  };

  const handleSaveEdit = (updatedPokemon) => {
    const { _id, ...updatedData } = updatedPokemon;

    fetch(`${path}/pokemon/${_id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedData),
    })
      .then(() => {
        setPokemonList(
          pokemonList.map((p) => (p._id === _id ? updatedPokemon : p))
        );
        setEditingPokemon(null);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const handleCancelEdit = () => {
    setEditingPokemon(null);
  };

  return (
    <PageContainer>
      <div className="main-container">
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
            baseEvolution={pokemon.baseEvolusjon}
            midEvolution={pokemon.midEvolusjon}
            fullEvolution={pokemon.fullEvolusjon}
            level={pokemon.nivå}
            trainerId={pokemon.trenerId}
            pokemon={pokemon}
            favIcon={favorites[pokemon.navn] ? "faved" : "unfaved"}
            onToggleFavorite={() => toggleFavorite(pokemon)}
            onDelete={() => deletePokemon(pokemon._id, pokemon.navn)}
            onEdit={() => handleEdit(pokemon)}
            isEditing={editingPokemon && editingPokemon._id === pokemon._id}
            onSaveEdit={handleSaveEdit}
            onCancelEdit={handleCancelEdit}
          />
        ))}
        <div className="icon-links-container">
          <IconLink icon="allPokemon" size="60" />
          <IconLink icon="addPokemon" size="60" />
          <IconLink icon="myFavorites" size="70" />
        </div>
      </div>
    </PageContainer>
  );
}
