import React, { useState, useEffect } from "react";
import SelectTrainer from "./selectTrainer/selectTrainer.component";
import InputText from "./inputText/inputText.component";

export default function EditPokemonModal({ pokemon, onSave, onCancel }) {
  const [navn, setNavn] = useState(pokemon.navn);
  const [type, setType] = useState(pokemon.type);
  const [nivå, setNivå] = useState(pokemon.nivå);
  const [trenerId, setTrenerId] = useState(pokemon.trenerId);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    setNavn(pokemon.navn);
    setType(pokemon.type);
    setNivå(pokemon.nivå);
    setTrenerId(pokemon.trenerId);
  }, [pokemon]);

  const validatePokemonData = () => {
    const errors = {};

    if (!navn) {
      errors.navn = "Navn er påkrevd";
    }
    if (!type) {
      errors.type = "Type er påkrevd";
    }
    if (!nivå) {
      errors.nivå = "Nivå er påkrevd";
    } else if (isNaN(nivå)) {
      errors.nivå = "Nivå må være et tall";
    }
    if (!trenerId) {
      errors.trenerId = "Trener ID er påkrevd";
    }

    return errors;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const formErrors = validatePokemonData();
    setErrors(formErrors);

    if (Object.keys(formErrors).length === 0) {
      onSave({ ...pokemon, navn, type, nivå, trenerId });
    }
  };

  return (
    <div className="modal">
      <form onSubmit={handleSubmit}>
        <InputText
          text="Navn"
          value={navn}
          onChange={(e) => setNavn(e.target.value)}
          error={errors.navn}
        />
        <InputText
          text="Type"
          value={type}
          onChange={(e) => setType(e.target.value)}
          error={errors.type}
        />
        <InputText
          text="Nivå"
          value={nivå}
          onChange={(e) => setNivå(e.target.value)}
          error={errors.nivå}
        />
        <SelectTrainer
          value={trenerId}
          onChange={(e) => setTrenerId(e.target.value)}
        />
        {errors.trenerId && <p className="error-message">{errors.trenerId}</p>}
        <button type="submit">Lagre</button>
        <button type="button" onClick={onCancel}>
          Avbryt
        </button>
      </form>
    </div>
  );
}
