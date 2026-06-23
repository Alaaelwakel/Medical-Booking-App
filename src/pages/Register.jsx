import {
 Box,
 TextField,
 Button,
 Typography,
 Paper,
 Avatar,
 MenuItem
} from "@mui/material";


import PersonAddIcon from "@mui/icons-material/PersonAdd";


import {useState} from "react";

import {useNavigate} from "react-router-dom";


import useAuth from "../hooks/useAuth";




function Register(){


const {register}=useAuth();


const navigate=useNavigate();



const [name,setName]=useState("");

const [email,setEmail]=useState("");

const [password,setPassword]=useState("");

const [role,setRole]=useState("patient");





const submit=async(e)=>{


e.preventDefault();



const user = await register({

name,

email,

password,

role,

isBlocked:false

});




if(user.role==="patient"){

navigate("/patient");

}


else if(user.role==="doctor"){

navigate("/doctor");

}


else if(user.role==="admin"){

navigate("/admin");

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

<PersonAddIcon/>

</Avatar>


<Typography

variant="h4"

mt={2}

>

Register

</Typography>


</Box>





<Box

component="form"

onSubmit={submit}

sx={{

display:"flex",

flexDirection:"column",

gap:2

}}

>



<TextField

label="Name"

value={name}

onChange={
(e)=>setName(e.target.value)
}

/>



<TextField

label="Email"

value={email}

onChange={
(e)=>setEmail(e.target.value)
}

/>



<TextField

label="Password"

type="password"

value={password}

onChange={
(e)=>setPassword(e.target.value)
}

/>



<TextField

select

label="Role"

value={role}

onChange={
(e)=>setRole(e.target.value)
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

size="large"

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