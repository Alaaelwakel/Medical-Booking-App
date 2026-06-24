import { Box } from "@mui/material";


function MainLayout({children}) {


return (

<Box

sx={{
minHeight:"100vh"
}}

>

{children}

</Box>

);

}


export default MainLayout;