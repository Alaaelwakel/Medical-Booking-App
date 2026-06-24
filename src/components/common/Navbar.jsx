import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Box,
  Button,
  Menu,
  MenuItem,
  Container,
  Typography,
} from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useAuth } from "../../context/AuthContext";

const Navbar = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated, logout } = useAuth();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    await logout();
    handleMenuClose();
    navigate("/login");
  };

  const handleDashboard = () => {
    if (user?.role === "patient") {
      navigate("/patient/dashboard");
    } else if (user?.role === "doctor") {
      navigate("/doctor/dashboard");
    } else if (user?.role === "admin") {
      navigate("/admin/dashboard");
    }
    handleMenuClose();
  };

  const handleProfile = () => {
    navigate("/profile/edit");
    handleMenuClose();
  };

  return (
    <AppBar position="sticky">
      <Container maxWidth="lg">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            sx={{ flexGrow: 1, cursor: "pointer", fontWeight: 700 }}
            onClick={() => navigate("/")}
          >
            🏥 Medical Booking
          </Typography>

          <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
            {!isAuthenticated ? (
              <>
                <Button color="inherit" onClick={() => navigate("/login")}>
                  Login
                </Button>
                <Button
                  color="inherit"
                  variant="outlined"
                  onClick={() => navigate("/register")}
                >
                  Register
                </Button>
              </>
            ) : (
              <>
                <Button color="inherit" onClick={() => navigate("/doctors")}>
                  Doctors
                </Button>
                <Button
                  color="inherit"
                  onClick={handleMenuOpen}
                  startIcon={<AccountCircleIcon />}
                >
                  {user?.name}
                </Button>
                <Menu
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={handleMenuClose}
                >
                  <MenuItem disabled>
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>
                      {user?.role}
                    </Typography>
                  </MenuItem>
                  <MenuItem onClick={handleDashboard}>Dashboard</MenuItem>
                  <MenuItem onClick={handleProfile}>Profile</MenuItem>
                  <MenuItem onClick={handleLogout}>Logout</MenuItem>
                </Menu>
              </>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;
