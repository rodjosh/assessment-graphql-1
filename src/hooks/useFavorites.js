import { useState } from "react";

export const useFavorites = () => {
  const [favorites, setFavorites] = useState({
    countries: [],
    languages: [],
    continents: [],
  });

  const setFavoritesCountries = (countries) => {
    setFavorites((prev) => ({ ...prev, countries }));
  };

  const addFavoriteCountry = (code) => {
    setFavoritesCountries([...favorites?.countries, code]);
  };

  const removeFavoriteCountry = (code) => {
    setFavoritesCountries(
      favorites?.countries.filter((countryCode) => countryCode !== code)
    );
  };

  const setFavoritesLanguages = (languages) => {
    setFavorites((prev) => ({ ...prev, languages }));
  };

  const setFavoritesContinents = (continents) => {
    setFavorites((prev) => ({ ...prev, continents }));
  };

  return {
    favorites,
    addFavoriteCountry,
    removeFavoriteCountry,
    setFavoritesLanguages,
    setFavoritesContinents,
  };
};
