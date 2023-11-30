import "./selectTrainer.styles.css";
import { TrainersContext } from "../../contexts/trainersContext";
import React, { useContext } from "react";

export default function SelectTrainer({ value, onChange }) {
  const { trainers } = useContext(TrainersContext);
  
  return (
    <div className="select-container">
      <select className="selecter" value={value} onChange={onChange}>
        <option value="">Velg trener:</option>
        {trainers.map((trainer) => (
          <option key={trainer._id} value={trainer._id}>
            {trainer.navn}
          </option>
        ))}
      </select>
    </div>
  );
}
