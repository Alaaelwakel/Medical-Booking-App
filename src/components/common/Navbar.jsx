import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Avatar,
  Chip
} from "@mui/material";

import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import LogoutIcon from "@mui/icons-material/Logout";

import { useTranslation } from "react-i18next";

import useAuth from "../../hooks/useAuth";

import LanguageSwitcher from "./LanguageSwitcher";
import ThemeToggle from "./ThemeToggle";

function Navbar() {

  const { user, logout } = useAuth();

  const { t } = useTranslation();

  return (

    <AppBar
      position="fixed"
      elevation={2}
    >
      <Toolbar>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1.5,
            flexGrow: 1
          }}
        >

          <LocalHospitalIcon />

          <Typography
            variant="h6"
            fontWeight="bold"
          >
            {t("appName")}
          </Typography>

        </Box>


        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 2
          }}
        >

          <LanguageSwitcher />

          <ThemeToggle />

          <Chip
            label={user?.role || "patient"}
            color="primary"
            size="small"
          />

          <Avatar>
            {user?.name?.charAt(0)?.toUpperCase() || "U"}
          </Avatar>

          <Typography
            fontWeight="500"
          >
            {user?.name || "User"}
          </Typography>

          <Button
            color="inherit"
            startIcon={<LogoutIcon />}
            onClick={logout}
          >
            {t("logout")}
          </Button>

        </Box>

      </Toolbar>
    </AppBar>

  );
}

export default Navbar;