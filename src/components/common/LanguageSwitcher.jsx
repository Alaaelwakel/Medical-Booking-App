import {
 Button
} from "@mui/material";

import { useTranslation } from "react-i18next";


function LanguageSwitcher(){

 const { i18n } = useTranslation();


 const changeLanguage = () => {

  const newLang =
   i18n.language === "en"
   ? "ar"
   : "en";


  i18n.changeLanguage(newLang);


  localStorage.setItem(
   "lang",
   newLang
  );


  document.dir =
   newLang === "ar"
   ? "rtl"
   : "ltr";

 };


 return (

  <Button
   color="inherit"
   onClick={changeLanguage}
  >

   {i18n.language === "en"
    ? "AR"
    : "EN"}

  </Button>

 )

}


export default LanguageSwitcher;