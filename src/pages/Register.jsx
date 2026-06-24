import {
Box,
TextField,
Button,
Typography,
Paper,
Avatar,
MenuItem,
Alert
} from "@mui/material";


import PersonAddIcon from "@mui/icons-material/PersonAdd";


import {useState} from "react";

import {useNavigate} from "react-router-dom";


import {
useForm
} from "react-hook-form";


import {
yupResolver
} from "@hookform/resolvers/yup";


import * as yup from "yup";


import useAuth from "../hooks/useAuth";





const schema = yup.object({

name:yup
.string()
.required("Name is required"),


email:yup
.string()
.email("Invalid email")
.required("Email is required"),


password:yup
.string()
.min(6,"Minimum 6 characters")
.required("Password is required"),


confirmPassword:yup
.string()
.oneOf(
[yup.ref("password")],
"Passwords must match"
)
.required("Confirm password required"),


role:yup
.string()
.required("Role is required")

});






function Register(){



const {register:registerUser}=useAuth();

const navigate=useNavigate();


const [error,setError]=useState("");





const {
register,
handleSubmit,
setValue,
watch,
formState:{
errors
}

}=useForm({

resolver:yupResolver(schema),

defaultValues:{

role:"patient"

}

});





const role =
watch("role");







const submit=async(data)=>{


try{


const user =
await registerUser({

name:data.name,

email:data.email,

password:data.password,

role:data.role,

isBlocked:false

});



if(user.role==="patient")
navigate("/patient");


else if(user.role==="doctor")
navigate("/doctor");


else if(user.role==="admin")
navigate("/admin");


}

catch(err){

setError("Registration failed");

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

p:4,

width:420,

borderRadius:4

}}

>


<Avatar>

<PersonAddIcon/>

</Avatar>


<Typography

variant="h4"

mt={2}

>

Register

</Typography>




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

label="Name"

{...register("name")}

error={!!errors.name}

helperText={errors.name?.message}

/>



<TextField

label="Email"

{...register("email")}

error={!!errors.email}

helperText={errors.email?.message}

/>



<TextField

label="Password"

type="password"

{...register("password")}

error={!!errors.password}

helperText={errors.password?.message}

/>



<TextField

label="Confirm Password"

type="password"

{...register("confirmPassword")}

error={!!errors.confirmPassword}

helperText={errors.confirmPassword?.message}

/>





<TextField

select

label="Role"

value={role}

onChange={
(e)=>setValue("role",e.target.value)
}

>


<MenuItem value="patient">
Patient
</MenuItem>


<MenuItem value="doctor">
Doctor
</MenuItem>


<MenuItem value="admin">
Admin
</MenuItem>


</TextField>





<Button

type="submit"

variant="contained"

>

Register

</Button>



<Button

onClick={()=>navigate("/login")}

>

Back To Login

</Button>



</Box>


</Paper>


</Box>


);


}


export default Register;