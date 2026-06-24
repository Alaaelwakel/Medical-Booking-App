import React from "react";
import { useNavigate } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {
  Container,
  Box,
  Card,
  TextField,
  Button,
  Typography,
  Link,
  Alert,
  CircularProgress,
} from "@mui/material";
import { toast } from "react-toastify";
import { useAuth } from "../../context/AuthContext";

// Validation schema
const loginSchema = yup.object({
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

const Login = () => {
  const navigate = useNavigate();
  const { login, loading, error } = useAuth();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data) => {
    try {
      await login(data);
      toast.success("Login successful!");
      navigate("/");
    } catch (err) {
      toast.error(err.message || "Login failed");
    }
  };

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
          py: 4,
        }}
      >
        <Card sx={{ width: "100%", p: 4, borderRadius: 2 }}>
          <Typography
            variant="h4"
            sx={{ mb: 3, fontWeight: 700, textAlign: "center" }}
          >
            Login
          </Typography>

          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          <form onSubmit={handleSubmit(onSubmit)}>
            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  label="Email"
                  type="email"
                  margin="normal"
                  error={!!errors.email}
                  helperText={errors.email?.message}
                  disabled={loading}
                />
              )}
            />

            <Controller
              name="password"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  label="Password"
                  type="password"
                  margin="normal"
                  error={!!errors.password}
                  helperText={errors.password?.message}
                  disabled={loading}
                />
              )}
            />

            <Button
              fullWidth
              variant="contained"
              color="primary"
              sx={{ mt: 3, py: 1.5 }}
              type="submit"
              disabled={loading}
            >
              {loading ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                "Login"
              )}
            </Button>
          </form>

          <Typography sx={{ mt: 2, textAlign: "center" }}>
            Don't have an account?{" "}
            <Link
              component="button"
              type="button"
              onClick={() => navigate("/register")}
              sx={{ cursor: "pointer" }}
            >
              Register
            </Link>
          </Typography>
        </Card>
      </Box>
    </Container>
  );
};

export default Login;
