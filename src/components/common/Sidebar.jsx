import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  Box
} from "@mui/material";


import DashboardIcon from "@mui/icons-material/Dashboard";
import EventNoteIcon from "@mui/icons-material/EventNote";
import PersonIcon from "@mui/icons-material/Person";
import GroupIcon from "@mui/icons-material/Group";
import SettingsIcon from "@mui/icons-material/Settings";


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
path:"/patient",
icon:<DashboardIcon/>
},
{
text:"appointments",
path:"/patient",
icon:<EventNoteIcon/>
},
{
text:"profile",
path:"/patient",
icon:<PersonIcon/>
}
],


doctor:[
{
text:"dashboard",
path:"/doctor",
icon:<DashboardIcon/>
},
{
text:"appointments",
path:"/doctor",
icon:<EventNoteIcon/>
},
{
text:"profile",
path:"/doctor",
icon:<PersonIcon/>
}
],


admin:[
{
text:"dashboard",
path:"/admin",
icon:<DashboardIcon/>
},
{
text:"users",
path:"/admin",
icon:<GroupIcon/>
},
{
text:"settings",
path:"/admin",
icon:<SettingsIcon/>
}

]

};



const items = menu[user?.role] || [];



return (


<Drawer

variant="permanent"

sx={{

width:260,

flexShrink:0,


"& .MuiDrawer-paper":{

width:260,

boxSizing:"border-box",

top:"64px",

height:"calc(100vh - 64px)"

}

}}

>


<Box sx={{p:2}}>


<Typography
variant="subtitle2"
color="text.secondary"
>

Navigation

</Typography>


</Box>



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


<ListItemIcon>

{item.icon}

</ListItemIcon>



<ListItemText

primary={t(item.text)}

/>


</ListItemButton>



</ListItem>


))


}



</List>


</Drawer>


);


}


export default Sidebar;