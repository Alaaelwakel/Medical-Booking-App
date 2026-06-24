import React from "react";
import { Container, Box, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ErrorIcon from "@mui/icons-material/Error";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <Container>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
          textAlign: "center",
        }}
      >
        <ErrorIcon sx={{ fontSize: 80, color: "error.main", mb: 2 }} />
        <Typography variant="h2" sx={{ fontWeight: 700, mb: 2 }}>
          404
        </Typography>
        <Typography variant="h5" sx={{ mb: 3, color: "text.secondary" }}>
          Page Not Found
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate("/")}
        >
          Go Home
        </Button>
      </Box>
    </Container>
  );
};

export default NotFound;
