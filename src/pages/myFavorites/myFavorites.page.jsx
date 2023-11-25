import { useFavorites } from "../../hooks/useFavorites";
import PokemonCard from "../../components/pokemonCard/pokemonCard.component";
import PageContainer from "../../components/pageContainer/pageContainer";
import Title from "../../components/title/title.component";
import IconLink from "../../components/iconLink/iconLink.component";
import "./myFavorites.styles.css";

export default function MyFavorites() {
  const { favorites, toggleFavorite } = useFavorites();

  return (
    <PageContainer>
      <Title title="Mine favoritter" />
      {Object.keys(favorites).length === 0 ? (
        <p className="feedback-message">
          Du har ikke lagt til noen favoritt-pokémon enda.
        </p>
      ) : (
        Object.values(favorites).map((favPokemon) => (
          <PokemonCard
            key={favPokemon._id}
            icon={favPokemon.navn}
            name={favPokemon.navn}
            type={favPokemon.type}
            level={favPokemon.nivå}
            trainer={favPokemon.trener}
            favIcon="faved"
            onToggleFavorite={() => toggleFavorite(favPokemon)}
          />
        ))
      )}
      <div className="icon-links-container">
        <IconLink icon="allPokemon" size="60" />
        <IconLink icon="addPokemon" size="60" />
        <IconLink icon="myFavorites" size="70" />
      </div>
    </PageContainer>
  );
}
