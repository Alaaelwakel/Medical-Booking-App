import {
  Box,
  TextField,
  Button,
  Typography
} from "@mui/material";

import { useState } from "react";
import { useNavigate } from "react-router-dom";

import useAuth from "../hooks/useAuth";

function Register() {

  const { login } = useAuth();

  const navigate = useNavigate();

  const [name, setName] = useState("");

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");


  const submit = async (e) => {

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
      onSubmit={submit}
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
        Register
      </Typography>


      <TextField
        label="Name"
        value={name}
        onChange={(e) =>
          setName(e.target.value)
        }
        fullWidth
      />


      <TextField
        label="Email"
        value={email}
        onChange={(e) =>
          setEmail(e.target.value)
        }
        fullWidth
      />


      <TextField
        label="Password"
        type="password"
        value={password}
        onChange={(e) =>
          setPassword(e.target.value)
        }
        fullWidth
      />


      <Button
        type="submit"
        variant="contained"
        size="large"
      >
        Register
      </Button>


      <Button
        variant="text"
        onClick={() => navigate("/login")}
      >
        Back To Login
      </Button>

    </Box>

  );

}

export default Register;