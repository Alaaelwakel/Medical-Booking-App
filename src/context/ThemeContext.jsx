import {
  createContext,
  useState,
  useMemo
} from "react";

import {
  createTheme,
  ThemeProvider
} from "@mui/material/styles";

import CssBaseline from "@mui/material/CssBaseline";


export const ThemeContext = createContext();



function ThemeContextProvider({ children }) {




  const [mode, setMode] = useState(
    localStorage.getItem("theme") || "light"
  );



  const toggleTheme = () => {


    const newMode =
      mode === "light"
        ? "dark"
        : "light";


    setMode(newMode);


    localStorage.setItem(
      "theme",
      newMode
    );

  };



  const theme = useMemo(() =>

    createTheme({

      palette: {
        mode
      }

    })

    , [mode]

  );



  const contextValue = useMemo(() => ({

    mode,
    toggleTheme

  }), [mode]);



  return (

    <ThemeContext.Provider
      value={contextValue}
    >

      <ThemeProvider theme={theme}>

        <CssBaseline />

        {children}

      </ThemeProvider>

    </ThemeContext.Provider>

  );

}


export default ThemeContextProvider;