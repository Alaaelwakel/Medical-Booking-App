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
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { toast } from "react-toastify";
import { useAuth } from "../../context/AuthContext";

// Validation schema
const registerSchema = yup.object({
  name: yup
    .string()
    .required("Name is required")
    .min(3, "Name must be at least 3 characters"),
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords must match")
    .required("Confirm password is required"),
  role: yup.string().oneOf(["patient", "doctor"]).required("Role is required"),
});

const Register = () => {
  const navigate = useNavigate();
  const { register: registerUser, loading, error } = useAuth();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      role: "patient",
    },
  });

  const onSubmit = async (data) => {
    try {
      await registerUser(data);
      toast.success("Registration successful!");
      navigate("/");
    } catch (err) {
      toast.error(err.message || "Registration failed");
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
            Register
          </Typography>

          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          <form onSubmit={handleSubmit(onSubmit)}>
            <Controller
              name="name"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  label="Full Name"
                  margin="normal"
                  error={!!errors.name}
                  helperText={errors.name?.message}
                  disabled={loading}
                />
              )}
            />

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

            <Controller
              name="confirmPassword"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  label="Confirm Password"
                  type="password"
                  margin="normal"
                  error={!!errors.confirmPassword}
                  helperText={errors.confirmPassword?.message}
                  disabled={loading}
                />
              )}
            />

            <Controller
              name="role"
              control={control}
              render={({ field }) => (
                <FormControl fullWidth margin="normal" error={!!errors.role}>
                  <InputLabel>Role</InputLabel>
                  <Select {...field} label="Role" disabled={loading}>
                    <MenuItem value="patient">Patient</MenuItem>
                    <MenuItem value="doctor">Doctor</MenuItem>
                  </Select>
                </FormControl>
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
                "Register"
              )}
            </Button>
          </form>

          <Typography sx={{ mt: 2, textAlign: "center" }}>
            Already have an account?{" "}
            <Link
              component="button"
              type="button"
              onClick={() => navigate("/login")}
              sx={{ cursor: "pointer" }}
            >
              Login
            </Link>
          </Typography>
        </Card>
      </Box>
    </Container>
  );
};

export default Register;
