import {Box} from "@mui/material";

import Navbar from "../components/common/Navbar";
import Sidebar from "../components/common/Sidebar";


function DashboardLayout({children}){


return (

<Box>


<Navbar/>

<Sidebar/>


<Box

component="main"

sx={{

ml:"260px",

mt:"64px",

p:3

}}

>


{children}


</Box>


</Box>

);

}


export default DashboardLayout;