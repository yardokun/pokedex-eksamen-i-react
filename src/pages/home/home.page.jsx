import IconLink from "../../components/iconLink/iconLink.component";

export default function Home() {
  return (
    <div className="icon-wrapper">
      <IconLink icon="allPokemon" text="Alle Pokémon" />
      <IconLink icon="addPokemon" text="Legg til Pokémon" />
      <IconLink icon="myFavorites" text="Mine Favoritter" />
    </div>
  );
}
