import PageContainer from "../../components/pageContainer/pageContainer";
import Title from "../../components/title/title.component";
import IconLink from "../../components/iconLink/iconLink.component";

export default function MyFavorites() {
  return (
    <PageContainer>
      <Title title="Mine favoritter" />
      <div className="icon-links-container">
        <IconLink icon="allPokemon" size="40" />
        <IconLink icon="addPokemon" size="40" />
        <IconLink icon="myFavorites" size="40" />
      </div>
    </PageContainer>
  );
}
