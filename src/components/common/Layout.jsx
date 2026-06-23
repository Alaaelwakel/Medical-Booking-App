import {
 Box
} from "@mui/material";


import Navbar from "./Navbar";
import Sidebar from "./Sidebar";


function Layout({children}){


return (

<Box>


<Navbar />

<Sidebar />


<Box
component="main"
sx={{
 ml:"240px",
 mt:"64px",
 p:3
}}
>

{children}


</Box>


</Box>

)

}


export default Layout;