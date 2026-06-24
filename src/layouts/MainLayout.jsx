import { Box } from "@mui/material";
import Navbar from "../components/common/Navbar";

const MainLayout = ({ children }) => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Navbar />
      <Box sx={{ flex: 1, pt: 3 }}>{children}</Box>
    </Box>
  );
};

export default MainLayout;
