import IconLink from "../../components/iconLink/iconLink.component";
import InputText from "../../components/inputText/inputText.component";
import PageContainer from "../../components/pageContainer/pageContainer";
import SelectTrainer from "../../components/selectTrainer/selectTrainer.component";
import Title from "../../components/title/title.component";
import "./addPokemon.styles.css";

export default function AddPokemon() {
  return (
    <PageContainer>
      <Title title="Legg til din Pokémon" />
      <form action="/allPokemon">
        <InputText text="Navn..." />
        <InputText text="Type..." />
        <InputText text="Nivå..." />
        <SelectTrainer />
        <button className="add-pokemon-btn">Legg til</button>
      </form>
      <div className="icon-links-container">
        <IconLink icon="allPokemon" size="40" />
        <IconLink icon="addPokemon" size="40" />
        <IconLink icon="myFavorites" size="40" />
      </div>
    </PageContainer>
  );
}
