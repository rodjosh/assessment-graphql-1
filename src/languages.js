import { Box, Container, Typography, List, ListItem } from "@mui/material";
import { gql, useQuery } from "@apollo/client";

import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import { useFavorites } from "./hooks/useFavorites";

const LANGUAGES = gql`
  query Languages {
    languages {
      code
      name
      native
      rtl
    }
  }
`;

const Languages = () => {
  const { loading, error, data, refetch } = useQuery(LANGUAGES);
  const { favorites, addFavoriteLanguage, removeFavoriteLanguage } =
    useFavorites();

  if (loading) return <>loading...</>;
  if (error) return <>error...</>;

  const languages = data.languages;
  const favoriteLanguages = favorites?.languages ?? [];

  return (
    <Container>
      <Typography variant="h1" sx={{ textAlign: "center" }}>
        Languages
      </Typography>

      <Box sx={{ textAlign: "center", padding: ".5rem" }}>
        {languages.length} Languages
      </Box>

      <Box sx={{ textAlign: "center", padding: ".5rem" }}>
        {favoriteLanguages.length} Favorite Languages
      </Box>

      <List>
        {languages.map((lang) => {
          const isFavorite = favoriteLanguages?.includes(lang?.name);

          const onClick = () => {
            if (isFavorite) return removeFavoriteLanguage(lang?.name);
            addFavoriteLanguage(lang?.name);
          };

          return (
            <ListItem
              key={lang.code}
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
              {lang?.code?.toUpperCase()} - {lang.name} - {lang.native}
            </ListItem>
          );
        })}
      </List>
    </Container>
  );
};

export default Languages;
