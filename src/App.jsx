import React from "react";
import "./globalStyles/reset.css";
import "./globalStyles/globalVariables.css";
import Routing from "./routing/routing.component";
import { FavoritesProvider } from "./hooks/useFavorites";

function App() {
  return (
    <FavoritesProvider>
      <Routing />
    </FavoritesProvider>
  );
}

export default App;
