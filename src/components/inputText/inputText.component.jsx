import "./inputText.styles.css";

export default function InputText({ text, value, onChange }) {
  return (
    <input
      className="inputText"
      type="text"
      placeholder={text}
      value={value}
      onChange={onChange}
    />
  );
}
