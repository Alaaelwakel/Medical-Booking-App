import {
  TextField,
  Button,
  Box,
  Typography,
  Paper,
  Avatar,
  Alert
} from "@mui/material";

import LocalHospitalIcon from "@mui/icons-material/LocalHospital";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";


import useAuth from "../hooks/useAuth";



const schema = yup.object({

  email: yup
    .string()
    .email("Invalid email")
    .required("Email is required"),


  password: yup
    .string()
    .min(6,"Password must be at least 6 characters")
    .required("Password is required")


});



function Login(){


const {login}=useAuth();

const navigate=useNavigate();

const {t}=useTranslation();


const [error,setError]=useState("");



const {
 register,
 handleSubmit,
 formState:{
  errors
 }

}=useForm({

 resolver:yupResolver(schema)

});




const submit = async(data)=>{


setError("");

try{


const user =
await login(
 data.email,
 data.password
);



if(user.role==="patient")
 navigate("/patient");


else if(user.role==="doctor")
 navigate("/doctor");


else if(user.role==="admin")
 navigate("/admin");


}

catch(err){

setError(
"Invalid email or password"
);

}


};






return (


<Box

sx={{

minHeight:"100vh",

display:"flex",

justifyContent:"center",

alignItems:"center",

px:2

}}

>


<Paper

elevation={8}

sx={{

width:"100%",

maxWidth:420,

p:4,

borderRadius:4

}}

>



<Box

sx={{

display:"flex",

flexDirection:"column",

alignItems:"center",

mb:3

}}

>


<Avatar>

<LocalHospitalIcon/>

</Avatar>


<Typography

variant="h4"

fontWeight="bold"

mt={2}

>

{t("login")}

</Typography>


</Box>




{
error &&

<Alert severity="error">

{error}

</Alert>

}





<Box

component="form"

onSubmit={
handleSubmit(submit)
}

sx={{

display:"flex",

flexDirection:"column",

gap:2

}}

>


<TextField

label={t("email")}

{...register("email")}

error={
!!errors.email
}

helperText={
errors.email?.message
}

/>



<TextField

label={t("password")}

type="password"

{...register("password")}

error={
!!errors.password
}

helperText={
errors.password?.message
}

/>




<Button

type="submit"

variant="contained"

size="large"

>

{t("login")}

</Button>



<Button

onClick={()=>navigate("/register")}

>

Create Account

</Button>


</Box>


</Paper>


</Box>


);


}


export default Login;