import { useState } from "react";
import EditPokemonModal from "../editPokemonModal.component";

export default function PokemonEditHandler({ children, pokemon, onSaveEdit }) {
  const [isEditing, setEditing] = useState(false);

  const handleEdit = () => {
    setEditing(true);
  };

  const handleSaveEdit = (updatedPokemon) => {
    onSaveEdit(updatedPokemon);
    setEditing(false);
  };

  const handleCancelEdit = () => {
    setEditing(false);
  };

  return (
    <>
      {isEditing ? (
        <EditPokemonModal
          pokemon={pokemon}
          onSave={handleSaveEdit}
          onCancel={handleCancelEdit}
        />
      ) : (
        children(handleEdit)
      )}
    </>
  );
}
