import { Typography, Container, Box, Modal } from "@mui/material";
import { gql, useQuery } from "@apollo/client";
import { useState } from "react";

const CONTINENTS = gql`
  query Continents {
    continents {
      code
      name
    }
  }
`;

const Continents = () => {
  const { loading, error, data, refetch } = useQuery(CONTINENTS);
  if (loading) return <>loading...</>;
  if (error) return <>error...</>;

  const continents = data?.continents ?? [];

  return (
    <Container>
      <Typography variant="h1" sx={{ textAlign: "center" }}>
        Countries
      </Typography>
      <Box>
        <Box sx={{ textAlign: "center", padding: ".5rem" }}>
          {continents.length} Countries
        </Box>
        {continents.map((continent) => (
          <Box
            key={continent.code}
            sx={{
              padding: ".5rem 0rem",
            }}
          >
            {continent.code} - {continent.name}
          </Box>
        ))}
      </Box>
    </Container>
  );
};

export default Continents;
