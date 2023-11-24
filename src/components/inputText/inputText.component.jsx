import "./inputText.styles.css";

export default function InputText({ text }) {
  return <input className="inputText" type="text" placeholder={text} />;
}
