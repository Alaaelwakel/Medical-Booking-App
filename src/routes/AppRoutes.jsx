import {
Routes,
Route,
Navigate
} from "react-router-dom";


import Login from "../pages/Login";
import Register from "../pages/Register";


import ProtectedRoute from "../components/auth/ProtectedRoute";


import MainLayout from "../layouts/MainLayout";
import DashboardLayout from "../layouts/DashboardLayout";



function AppRoutes(){


return (

<Routes>



<Route

path="/"

element={
<Navigate to="/login" replace />
}

/>




<Route

path="/login"

element={

<MainLayout>

<Login />

</MainLayout>

}

/>




<Route

path="/register"

element={

<MainLayout>

<Register />

</MainLayout>

}

/>







<Route

path="/patient"

element={


<ProtectedRoute allowedRoles={["patient"]}>


<DashboardLayout>


<h1>
Patient Dashboard
</h1>


</DashboardLayout>


</ProtectedRoute>


}


/>







<Route

path="/doctor"

element={


<ProtectedRoute allowedRoles={["doctor"]}>


<DashboardLayout>


<h1>
Doctor Dashboard
</h1>


</DashboardLayout>


</ProtectedRoute>


}


/>







<Route

path="/admin"

element={


<ProtectedRoute allowedRoles={["admin"]}>


<DashboardLayout>


<h1>
Admin Dashboard
</h1>


</DashboardLayout>


</ProtectedRoute>


}


/>







{/* Placeholder Routes */}

<Route

path="/doctors"

element={

<div>

Coming Soon

</div>

}

/>




<Route

path="/doctors/:id"

element={

<div>

Coming Soon

</div>

}

/>





<Route

path="/profile/edit"

element={

<div>

Coming Soon

</div>

}

/>







<Route

path="*"

element={
<h1>
404 Not Found
</h1>
}

/>





</Routes>

);


}


export default AppRoutes;