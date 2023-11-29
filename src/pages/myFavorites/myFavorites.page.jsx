import { useFavorites } from "../../hooks/useFavorites";
import PokemonCard from "../../components/pokemonCard/pokemonCard.component";
import PageContainer from "../../components/pageContainer/pageContainer";
import Title from "../../components/title/title.component";
import IconLink from "../../components/iconLink/iconLink.component";
import "./myFavorites.styles.css";
import PokemonEditHandler from "../../components/pokemonEditHandler/pokemonEditHandler.component";

export default function MyFavorites() {
  const { favorites, toggleFavorite, removeFavorite, setFavorites } =
    useFavorites();

  /*   const deletePokemon = (pokemonName) => {
    removeFavorite(pokemonName); // Fjerner fra favoritter
  }; */

  const handleSaveEdit = (updatedPokemon) => {
    const updatedFavorites = { ...favorites };
    updatedFavorites[updatedPokemon.navn] = updatedPokemon;
    setFavorites(updatedFavorites);
  };

  return (
    <PageContainer>
      <div className="main-container">
        <Title title="Mine favoritter" />
        {Object.keys(favorites).length === 0 ? (
          <p className="feedback-message">
            Du har ikke lagt til noen favoritt-pokémon enda.
          </p>
        ) : (
          Object.values(favorites).map((favPokemon) => (
            <PokemonEditHandler
              key={favPokemon._id}
              pokemon={favPokemon}
              onSaveEdit={handleSaveEdit}
            >
              {(handleEdit) => (
                <PokemonCard
                  key={favPokemon._id}
                  icon={favPokemon.navn}
                  name={favPokemon.navn}
                  type={favPokemon.type}
                  level={favPokemon.nivå}
                  trainerId={favPokemon.trenerId}
                  pokemon={favPokemon}
                  favIcon="faved"
                  onToggleFavorite={() => toggleFavorite(favPokemon)}
                  onDelete={() => removeFavorite(favPokemon.navn)}
                  onEdit={handleEdit}
                />
              )}
            </PokemonEditHandler>
          ))
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
