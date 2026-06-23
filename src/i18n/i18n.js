import i18n from "i18next";
import { initReactI18next } from "react-i18next";


const resources = {


  en: {

    translation: {

      appName: "Medical Booking",

      dashboard: "Dashboard",

      appointments: "Appointments",

      profile: "Profile",

      logout: "Logout",

      users: "Users",

      settings: "Settings",

      login:"Login",
      register:"Register",
      email:"Email",
      password:"Password"

    }

  },



  ar: {

    translation: {

      appName: "الحجز الطبي",

      dashboard: "لوحة التحكم",

      appointments: "المواعيد",

      profile: "الملف الشخصي",

      logout: "تسجيل الخروج",

      users: "المستخدمين",

      settings: "الإعدادات",

      login:"تسجيل الدخول",
      
      register:"إنشاء حساب",
      
      email:"البريد الإلكتروني",
      
      password:"كلمة المرور"

    }

  }


};



i18n
.use(initReactI18next)
.init({

  resources,

  lng: localStorage.getItem("lang") || "en",

  interpolation:{
    escapeValue:false
  }

});


export default i18n;