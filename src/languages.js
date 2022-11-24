import { Box, Container, Typography, List, ListItem } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { gql, useQuery } from "@apollo/client";

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

  if (loading) return <>loading...</>;
  if (error) return <>error...</>;

  const languages = data.languages;

  return (
    <Container>
      <Typography variant="h1" sx={{ textAlign: "center" }}>
        Languages
      </Typography>
      <Box sx={{ textAlign: "center", padding: ".5rem" }}>
        {languages.length} Languages
      </Box>

      <List>
        {languages.map((lang) => (
          <ListItem key={lang.code}>
            {lang.code} - {lang.name} - {lang.native}
          </ListItem>
        ))}
      </List>
    </Container>
  );
};

export default Languages;
