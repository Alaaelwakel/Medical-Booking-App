import {
  Routes,
  Route,
  Navigate
} from "react-router-dom";

import Login from "../pages/Login";
import Register from "../pages/Register";

import ProtectedRoute from "../components/auth/ProtectedRoute";

import Layout from "../components/common/Layout";


function AppRoutes() {

  return (

    <Routes>

      <Route
        path="/"
        element={<Navigate to="/login" replace />}
      />


      <Route
        path="/login"
        element={<Login />}
      />


      <Route
        path="/register"
        element={<Register />}
      />


      <Route
        path="/patient"
        element={

          <ProtectedRoute allowedRoles={["patient"]}>

            <Layout>

              <h1>Patient Dashboard</h1>

            </Layout>

          </ProtectedRoute>

        }
      />


      <Route
        path="/doctor"
        element={

          <ProtectedRoute allowedRoles={["doctor"]}>

            <Layout>

              <h1>Doctor Dashboard</h1>

            </Layout>

          </ProtectedRoute>

        }
      />


      <Route
        path="/admin"
        element={

          <ProtectedRoute allowedRoles={["admin"]}>

            <Layout>

              <h1>Admin Dashboard</h1>

            </Layout>

          </ProtectedRoute>

        }
      />


      <Route
        path="*"
        element={<h1>404 Not Found</h1>}
      />

    </Routes>

  );

}

export default AppRoutes;