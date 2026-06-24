import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import MainLayout from "../layouts/MainLayout";
import DashboardLayout from "../layouts/DashboardLayout";

// Auth Pages
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";

// Doctor Pages
import DoctorSearch from "../pages/doctors/DoctorSearch";
import DoctorProfile from "../pages/doctors/DoctorProfile";

// Patient Pages
import PatientDashboard from "../pages/patient/PatientDashboard";
import ProfileEdit from "../pages/profile/ProfileEdit";

// Doctor Pages
import DoctorDashboard from "../pages/doctor/DoctorDashboard";

// Admin Pages
import AdminDashboard from "../pages/admin/AdminDashboard";

// Public Pages
import NotFound from "../pages/NotFound";

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        {/* Auth Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Public Routes with MainLayout */}
        <Route
          path="/"
          element={
            <MainLayout>
              <DoctorSearch />
            </MainLayout>
          }
        />
        <Route
          path="/doctors"
          element={
            <MainLayout>
              <DoctorSearch />
            </MainLayout>
          }
        />

        {/* Protected Patient Routes */}
        <Route
          path="/doctors/:id"
          element={
            <ProtectedRoute
              element={
                <MainLayout>
                  <DoctorProfile />
                </MainLayout>
              }
              allowedRoles={["patient"]}
            />
          }
        />

        <Route
          path="/patient/dashboard"
          element={
            <ProtectedRoute
              element={
                <DashboardLayout>
                  <PatientDashboard />
                </DashboardLayout>
              }
              allowedRoles={["patient"]}
            />
          }
        />

        <Route
          path="/profile/edit"
          element={
            <ProtectedRoute
              element={
                <DashboardLayout>
                  <ProfileEdit />
                </DashboardLayout>
              }
              allowedRoles={["patient"]}
            />
          }
        />

        {/* Protected Doctor Routes */}
        <Route
          path="/doctor/dashboard"
          element={
            <ProtectedRoute
              element={
                <DashboardLayout>
                  <DoctorDashboard />
                </DashboardLayout>
              }
              allowedRoles={["doctor"]}
            />
          }
        />

        {/* Protected Admin Routes */}
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute
              element={
                <DashboardLayout>
                  <AdminDashboard />
                </DashboardLayout>
              }
              allowedRoles={["admin"]}
            />
          }
        />

        {/* Fallback Routes */}
        <Route path="/not-found" element={<NotFound />} />
        <Route path="*" element={<Navigate to="/not-found" replace />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
