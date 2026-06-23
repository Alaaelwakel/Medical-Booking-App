import {
 IconButton
} from "@mui/material";


import DarkModeIcon from "@mui/icons-material/DarkMode";

import LightModeIcon from "@mui/icons-material/LightMode";


import { useContext } from "react";

import { ThemeContext } from "../../context/ThemeContext";



function ThemeToggle(){


const {
 mode,
 toggleTheme
}=useContext(ThemeContext);



return (

<IconButton
color="inherit"
onClick={toggleTheme}
>


{
mode==="light"
?
<DarkModeIcon />
:
<LightModeIcon />
}


</IconButton>

)


}


export default ThemeToggle;