import { Typography, Container, Box, Modal } from "@mui/material";
import { gql, useQuery } from "@apollo/client";
import { useState } from "react";

import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";

import { useFavorites } from "./hooks/useFavorites";

const COUNTRIES = gql`
  query Countries {
    countries {
      code
      name
      phone
      languages {
        code
        name
        native
      }
      currency
      emoji
      emojiU
      states {
        name
        code
      }
    }
  }
`;

const COUNTRY = gql`
  query Country($code: ID!) {
    country(code: $code) {
      code
      name
      phone
      languages {
        code
        name
        native
      }
      currency
      emoji
      emojiU
      states {
        name
        code
      }
    }
  }
`;

const Country = ({ code }) => {
  const { loading, error, data, refetch } = useQuery(COUNTRY, {
    variables: { code },
  });

  const country = data?.country;

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 200,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  return (
    <Box sx={style}>
      {loading && !error && "loading..."}
      {!loading && error && "loading..."}

      {!loading && !error && (
        <>
          <Typography sx={{ mt: 2 }}>Name: {country?.name}</Typography>
          <Typography sx={{ mt: 2 }}>Code: {country?.code}</Typography>
          <Typography sx={{ mt: 2 }}>Currency: {country?.currency}</Typography>
          <Typography sx={{ mt: 2 }}>Emoji: {country?.emoji}</Typography>
          <Typography sx={{ mt: 2 }}>Phone: {country?.phone}</Typography>
          <Typography sx={{ mt: 2 }}>
            States: {country?.states?.length}
          </Typography>
        </>
      )}
    </Box>
  );
};

const Countries = () => {
  const { favorites, addFavoriteCountry, removeFavoriteCountry } =
    useFavorites();

  const [countryOpen, setCountryOpen] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState();
  const { loading, error, data, refetch } = useQuery(COUNTRIES);

  if (loading) return <>loading...</>;
  if (error) return <>error...</>;

  const countries = data.countries;
  const favoriteCountries = favorites?.countries ?? [];
  const countriesWithStates = countries.filter(
    (country) => country.states.length > 0
  );

  const toggleCountry = () => setCountryOpen(!countryOpen);

  const openModal = (code) => {
    setSelectedCountry(code);
    toggleCountry();
  };

  return (
    <Container>
      <Typography variant="h1" sx={{ textAlign: "center" }}>
        Countries
      </Typography>
      <Box>
        <Box sx={{ textAlign: "center", padding: ".5rem" }}>
          {countries.length} Countries
        </Box>

        <Box sx={{ textAlign: "center", padding: ".5rem" }}>
          {countriesWithStates.length} Countries with states
        </Box>

        <Box sx={{ textAlign: "center", padding: ".5rem" }}>
          {favoriteCountries.length} Favorite Countries
        </Box>

        {countries.map((country) => {
          const isFavorite = favoriteCountries?.includes(country?.name);

          const onClick = () => {
            if (isFavorite) return removeFavoriteCountry(country?.name);
            addFavoriteCountry(country?.name);
          };

          return (
            <Box
              key={country.code}
              sx={{
                display: "flex",
                alignItems: "center",
                padding: ".5rem 0rem",
                color: country.states.length > 0 ? "blue" : "#999",
              }}
            >
              <Box
                component="span"
                onClick={onClick}
                sx={{ color: "orange", marginRight: "20px" }}
              >
                {isFavorite && <StarIcon />}
                {!isFavorite && <StarBorderIcon />}
              </Box>

              <a href="#" onClick={() => openModal(country.code)}>
                {country.emoji} {country.name}{" "}
                {country.states.length > 0 && country.states.length}
                {" - "}
                {country.states.length > 1 && "States"}
                {country.states.length === 1 && "State"}
              </a>
            </Box>
          );
        })}
      </Box>

      <Modal open={countryOpen} onClose={toggleCountry}>
        <Country code={selectedCountry} />
      </Modal>
    </Container>
  );
};

export default Countries;
