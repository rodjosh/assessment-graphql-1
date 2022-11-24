import { Typography, Container, Box } from "@mui/material";
import { gql, useQuery } from "@apollo/client";

import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import { useFavorites } from "./hooks/useFavorites";

const CONTINENTS = gql`
  query Continents {
    continents {
      code
      name
    }
  }
`;

const Continents = () => {
  const { favorites, addFavoriteContinent, removeFavoriteContinent } =
    useFavorites();

  const { loading, error, data, refetch } = useQuery(CONTINENTS);
  if (loading) return <>loading...</>;
  if (error) return <>error...</>;

  const continents = data?.continents ?? [];
  const favoriteContinents = favorites?.continents ?? [];

  return (
    <Container>
      <Typography variant="h1" sx={{ textAlign: "center" }}>
        Countries
      </Typography>
      <Box>
        <Box sx={{ textAlign: "center", padding: ".5rem" }}>
          {continents.length} Countries
        </Box>

        <Box sx={{ textAlign: "center", padding: ".5rem" }}>
          {favoriteContinents.length} Favorite Continents
        </Box>

        {continents.map((continent) => {
          const isFavorite = favoriteContinents?.includes(continent?.name);

          const onClick = () => {
            if (isFavorite) return removeFavoriteContinent(continent?.name);
            addFavoriteContinent(continent?.name);
          };

          return (
            <Box
              key={continent.code}
              sx={{
                display: "flex",
                alignItems: "center",
                padding: ".5rem 0rem",
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
              {continent.code} - {continent.name}
            </Box>
          );
        })}
      </Box>
    </Container>
  );
};

export default Continents;
