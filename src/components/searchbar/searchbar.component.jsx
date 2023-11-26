import "./searchbar.styles.css";

export default function Searchbar({ value, onChange }) {
  return (
    <input
      className="searchbar"
      type="text"
      placeholder="Søk etter Pokémon.."
      value={value}
      onChange={onChange}
    />
  );
}
