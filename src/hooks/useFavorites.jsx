import { useState, useContext, createContext } from "react";

const FavoritesContext = createContext();

export const useFavorites = () => useContext(FavoritesContext);

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState({});

  const toggleFavorite = (pokemon) => {
    setFavorites((prevFavorites) => {
      const newFavorites = { ...prevFavorites };
      if (newFavorites[pokemon.navn]) {
        delete newFavorites[pokemon.navn];
      } else {
        newFavorites[pokemon.navn] = pokemon;
      }
      return newFavorites;
    });
  };

  const removeFavorite = (pokemonName) => {
    setFavorites((prevFavorites) => {
      const newFavorites = { ...prevFavorites };
      delete newFavorites[pokemonName];
      return newFavorites;
    });
  };

  return (
    <FavoritesContext.Provider
      value={{ favorites, setFavorites, toggleFavorite, removeFavorite }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};
