import { Container, Typography } from "@mui/material";
import { useFavorites } from "./hooks/useFavorites";

const Home = () => {
  const { favorites } = useFavorites();

  const allFavorites = Object.values(favorites)?.reduce((a, b) => a.concat(b));

  return (
    <Container>
      <Typography variant="h1" sx={{ textAlign: "center" }}>
        Home page
      </Typography>

      <Typography variant="h5" sx={{ textAlign: "center" }}>
        {allFavorites?.length} Favorites
      </Typography>

      <Typography variant="h5" sx={{ textAlign: "center" }}>
        Continents: {favorites?.continents?.join(", ")}
      </Typography>

      <Typography variant="h5" sx={{ textAlign: "center" }}>
        Countries: {favorites?.countries?.join(", ")}
      </Typography>

      <Typography variant="h5" sx={{ textAlign: "center" }}>
        Languages: {favorites?.languages?.join(", ")}
      </Typography>
    </Container>
  );
};

export default Home;
