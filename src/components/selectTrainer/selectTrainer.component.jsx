import "./selectTrainer.styles.css";

export default function SelectTrainer({ value, onChange, name }) {
  return (
    <div className="select-container">
      <select className="selecter">
        <option value="0">Velg trener:</option>
        <option value="1">Ash Ketchum</option>
        <option value="2">Gary Oak</option>
      </select>
    </div>
  );
}
