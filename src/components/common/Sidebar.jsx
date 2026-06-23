import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText
} from "@mui/material";


import { useNavigate } from "react-router-dom";

import { useTranslation } from "react-i18next";


import useAuth from "../../hooks/useAuth";



function Sidebar(){


const navigate = useNavigate();

const { user } = useAuth();

const { t } = useTranslation();



const menu = {


patient:[
{
text:"dashboard",
path:"/patient"
},
{
text:"appointments",
path:"/patient"
},
{
text:"profile",
path:"/patient"
}
],


doctor:[
{
text:"dashboard",
path:"/doctor"
},
{
text:"appointments",
path:"/doctor"
},
{
text:"profile",
path:"/doctor"
}
],


admin:[
{
text:"dashboard",
path:"/admin"
},
{
text:"users",
path:"/admin"
},
{
text:"settings",
path:"/admin"
}

]


};



const items = menu[user?.role] || [];



return (


<Drawer

variant="permanent"

sx={{
width:240,

"& .MuiDrawer-paper":{
width:240,
boxSizing:"border-box",
top:64
}

}}

>



<List>


{
items.map(item=>(


<ListItem
key={item.text}
disablePadding
>


<ListItemButton
onClick={()=>navigate(item.path)}
>


<ListItemText
primary={t(item.text)}
/>



</ListItemButton>



</ListItem>


))


}


</List>


</Drawer>


)


}



export default Sidebar;