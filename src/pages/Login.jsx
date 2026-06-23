import {
  TextField,
  Button,
  Box,
  Typography
} from "@mui/material";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

import useAuth from "../hooks/useAuth";

function Login() {

  const { login } = useAuth();

  const navigate = useNavigate();

  const { t } = useTranslation();

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");


  const handleSubmit = async (e) => {

    e.preventDefault();

    await login(
      email,
      password
    );

    navigate("/patient");

  };


  return (

    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        width: 350,
        mx: "auto",
        mt: 10,
        display: "flex",
        flexDirection: "column",
        gap: 2
      }}
    >

      <Typography
        variant="h4"
        textAlign="center"
      >
        {t("login")}
      </Typography>


      <TextField
        label={t("email")}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        fullWidth
      />


      <TextField
        label={t("password")}
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        fullWidth
      />


      <Button
        type="submit"
        variant="contained"
        size="large"
      >
        {t("login")}
      </Button>


      <Button
        variant="text"
        onClick={() => navigate("/register")}
      >
        Create Account
      </Button>

    </Box>

  );

}

export default Login;