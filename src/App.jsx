import React from "react";
import "./globalStyles/reset.css";
import "./globalStyles/globalVariables.css";
import Routing from "./routing/routing.component";
import { FavoritesProvider } from "./hooks/useFavorites";
import { TrainersProvider } from "./contexts/trainersContext";

function App() {
  return (
    <FavoritesProvider>
      <TrainersProvider>
        <Routing />
      </TrainersProvider>
    </FavoritesProvider>
  );
}

export default App;
