import { useState, useEffect } from "react";
import { useFavorites } from "../../hooks/useFavorites";
import PageContainer from "../../components/pageContainer/pageContainer";
import PokemonCard from "../../components/pokemonCard/pokemonCard.component";
import Title from "../../components/title/title.component";
import IconLink from "../../components/iconLink/iconLink.component";
import { path, routes } from "../../routing/endpoints";
import "./allPokemon.styles.css";
import Searchbar from "../../components/searchbar/searchbar.component";
import PokemonEditHandler from "../../components/pokemonEditHandler/pokemonEditHandler.component";
import TrainerCard from "../../components/trainerCard/trainerCard.component";

export default function AllPokemon() {
  const [pokemonList, setPokemonList] = useState([]);
  const [filteredPokemonList, setFilteredPokemonList] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [error] = useState(null);
  const { favorites, toggleFavorite, removeFavorite } = useFavorites();
  const [trainerList, setTrainerList] = useState([]);

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

  const initTrainers = [
    {
      navn: "Ash Ketchum",
      alder: 12,
      trenernivå: "Mester",
      pokemons: [],
    },
    {
      navn: "Gary Oak",
      alder: 15,
      trenernivå: "Elite Fire",
      pokemons: [],
    },
  ];

  useEffect(() => {
    const fetchPokemons = async () => {
      const response = await fetch(`${path}${routes.getPokemon}`);
      return await response.json();
    };

    const fetchTrainers = async () => {
      const response = await fetch(`${path}${routes.getTrainers}`);
      const trainers = await response.json();
      console.log("Fetched trainers:", trainers);
      return trainers;
    };

    const initApp = async () => {
      const pokemons = await fetchPokemons();
      let trainers = await fetchTrainers();

      if (pokemons.length === 0) {
        for (const pokemon of initPokemons) {
          await fetch(`${path}/pokemon`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(pokemon),
          });
        }
      }
      setPokemonList(pokemons);

      const trainersInitialized = localStorage.getItem("trainersInitialized");
      if (trainers.length === 0 && !trainersInitialized) {
        for (const trainer of initTrainers) {
          await fetch(`${path}/trenere`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(trainer),
          });
        }
        localStorage.setItem("trainersInitialized", "true");
        trainers = await fetchTrainers();
      }
      setTrainerList(trainers);
    };

    initApp();
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
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <PageContainer>
      <div className="main-container">
        <Searchbar value={searchTerm} onChange={handleSearchChange} />
        <Title title="Alle Pokémon" />
        {error && <p className="error-message">{error}</p>}
        {(searchTerm ? filteredPokemonList : pokemonList).map((pokemon) => (
          <PokemonEditHandler
            key={pokemon._id}
            pokemon={pokemon}
            onSaveEdit={handleSaveEdit}
          >
            {(handleEdit) => (
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
                onEdit={handleEdit}
              />
            )}
          </PokemonEditHandler>
        ))}
        <Title title="Alle Trenere" />
        {trainerList.length > 0 ? (
          trainerList.map((trainer) => (
            <TrainerCard
              key={trainer._id}
              icon={trainer.navn}
              name={trainer.navn}
              age={trainer.alder}
              trainerLevel={trainer.trenernivå}
              pokemons={trainer.pokemons}
            />
          ))
        ) : (
          <p>Ingen trenere funnet</p>
        )}
        <div className="icon-links-container">
          <IconLink icon="allPokemon" size="60" />
          <IconLink icon="addPokemon" size="60" />
          <IconLink icon="myFavorites" size="70" />
        </div>
      </div>
    </PageContainer>
  );
}
