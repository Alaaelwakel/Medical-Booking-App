import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import {
 BrowserRouter
} from "react-router-dom";


import './index.css'
import "./i18n/i18n";
import App from './App.jsx'

import AuthProvider from "./context/AuthContext.jsx";
import ThemeContextProvider from "./context/ThemeContext.jsx";

const lang =
localStorage.getItem("lang") || "en";


document.dir =
lang === "ar"
? "rtl"
: "ltr";

createRoot(document.getElementById('root')).render(

<StrictMode>

<BrowserRouter>

<AuthProvider>

<ThemeContextProvider>

<App />

</ThemeContextProvider>

</AuthProvider>

</BrowserRouter>

</StrictMode>

)