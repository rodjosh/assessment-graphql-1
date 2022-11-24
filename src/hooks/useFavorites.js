import { useEffect, useState } from "react";

export const useFavorites = () => {
  const initialState = JSON.parse(localStorage.getItem("favorites"));
  const [favorites, setFavorites] = useState(
    initialState ?? {
      countries: [],
      languages: [],
      continents: [],
    }
  );

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  const setFavoritesCountries = (countries) => {
    setFavorites((prev) => ({ ...prev, countries }));
  };

  const addFavoriteCountry = (name) => {
    setFavoritesCountries([...favorites?.countries, name]);
  };

  const removeFavoriteCountry = (name) => {
    setFavoritesCountries(
      favorites?.countries.filter((countryName) => countryName !== name)
    );
  };

  const setFavoritesLanguages = (languages) => {
    setFavorites((prev) => ({ ...prev, languages }));
  };

  const addFavoriteLanguage = (name) => {
    setFavoritesLanguages([...favorites?.languages, name]);
  };

  const removeFavoriteLanguage = (name) => {
    setFavoritesLanguages(
      favorites?.languages.filter((language) => language !== name)
    );
  };

  const setFavoritesContinents = (continents) => {
    setFavorites((prev) => ({ ...prev, continents }));
  };

  const addFavoriteContinent = (name) => {
    setFavoritesContinents([...favorites?.continents, name]);
  };

  const removeFavoriteContinent = (name) => {
    setFavoritesContinents(
      favorites?.continents.filter((continentName) => continentName !== name)
    );
  };

  return {
    favorites,
    addFavoriteCountry,
    removeFavoriteCountry,
    addFavoriteLanguage,
    removeFavoriteLanguage,
    addFavoriteContinent,
    removeFavoriteContinent,
  };
};
