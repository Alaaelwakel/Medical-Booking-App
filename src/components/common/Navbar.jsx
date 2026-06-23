import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box
} from "@mui/material";


import { useTranslation } from "react-i18next";


import useAuth from "../../hooks/useAuth";


import LanguageSwitcher from "./LanguageSwitcher";

import ThemeToggle from "./ThemeToggle";



function Navbar() {


  const { user, logout } = useAuth();


  const { t } = useTranslation();



  return (

    <AppBar position="fixed">


      <Toolbar>



        <Typography
          variant="h6"
          sx={{ flexGrow: 1 }}
        >

          {t("appName")}

        </Typography>





        <Box
          sx={{
            display:"flex",
            alignItems:"center",
            gap:2
          }}
        >





          <Typography>

            {user?.name || "User"}

          </Typography>





          <Typography
            variant="body2"
            sx={{opacity:0.7}}
          >

            ({user?.role})

          </Typography>





          {/* Language Button */}
          <LanguageSwitcher />



          {/* Dark / Light Mode Button */}
          <ThemeToggle />





          <Button
            color="inherit"
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