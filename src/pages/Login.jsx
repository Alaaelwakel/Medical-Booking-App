import {
 TextField,
 Button,
 Box,
 Typography,
 Paper,
 Avatar
} from "@mui/material";


import LocalHospitalIcon from "@mui/icons-material/LocalHospital";


import {useState} from "react";

import {useNavigate} from "react-router-dom";

import {useTranslation} from "react-i18next";


import useAuth from "../hooks/useAuth";



function Login(){


const {login}=useAuth();


const navigate=useNavigate();


const {t}=useTranslation();



const [email,setEmail]=useState("");

const [password,setPassword]=useState("");





const handleSubmit=async(e)=>{


e.preventDefault();



try{


const user = await login(
 email,
 password
);



if(user.role==="patient"){

 navigate("/patient");

}


else if(user.role==="doctor"){

 navigate("/doctor");

}


else if(user.role==="admin"){

 navigate("/admin");

}



}

catch(err){

 alert("Invalid email or password");

}


};







return (


<Box

sx={{

minHeight:"100vh",

display:"flex",

justifyContent:"center",

alignItems:"center"

}}

>


<Paper

elevation={8}

sx={{

width:400,

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
mt={2}
>

{t("login")}

</Typography>


</Box>





<Box

component="form"

onSubmit={handleSubmit}

sx={{

display:"flex",

flexDirection:"column",

gap:2

}}

>


<TextField

label={t("email")}

value={email}

onChange={
(e)=>setEmail(e.target.value)
}

/>



<TextField

label={t("password")}

type="password"

value={password}

onChange={
(e)=>setPassword(e.target.value)
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