import { Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout.tsx";
import { lazy, Suspense } from "react";
import LoadingSpinner from "./components/common/LoadingSpinner.tsx";
import Register from "./pages/auth/Register.tsx";
import Login from "./pages/auth/Login.tsx";
import ForgotPassword from "./pages/auth/ForgotPassword.tsx";
import ResetPassword from "./pages/auth/ResetPassword.tsx";
import { Toaster } from "react-hot-toast";
import GuestRoute from "./components/routes/GuestRoute.tsx";
import AdminDashboard from "./pages/admin/AdminDashboard.tsx";
import ProtectedRoutes from "./components/routes/ProtectedRoutes.tsx";
import { CreateJob } from "./pages/job-management/CreateJob.tsx";
import ManageJobs from "./pages/job-management/ManageJobs.tsx";
import { EditJob } from "./pages/job-management/EditJob.tsx";
import ManageCategories from "./pages/category-management/ManageCategories.tsx";

const Home = lazy(() => import("./pages/Home.tsx"));
const Jobs = lazy(() => import("./pages/Jobs.tsx"));
const About = lazy(() => import("./pages/About.tsx"));
const Companies = lazy(() => import("./pages/Companies.tsx"));

const App = () => {
  return (
    <>
      <Suspense fallback={<LoadingSpinner />}>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Home />} />
            <Route path="/jobs" element={<Jobs />} />
            <Route path="/jobs/:id" element={<Jobs />} />
            <Route element={<GuestRoute />}>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route
                path="/reset-password/:token"
                element={<ResetPassword />}
              />
            </Route>
            <Route path="/companies" element={<Companies />} />
            <Route path="/about" element={<About />} />
            <Route element={<ProtectedRoutes allowedRoles={["admin"]} />}>
              <Route path="/admin/dashboard" element={<AdminDashboard />} />
            </Route>
            <Route
              element={
                <ProtectedRoutes allowedRoles={["admin", "recruiter"]} />
              }
            >
              <Route path="/jobs/manage" element={<ManageJobs />} />
              <Route path="/jobs/create" element={<CreateJob />} />
              <Route path="/jobs/:id/edit" element={<EditJob />} />
            </Route>
            <Route element={<ProtectedRoutes allowedRoles={["admin"]} />}>
              <Route path="/categories/manage" element={<ManageCategories />} />
              <Route path="/categories/" element={<ManageCategories />} />
            </Route>

            <Route path="*" element={<div>404 - Page Not Found</div>} />
          </Route>
        </Routes>
      </Suspense>
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
        }}
      />
    </>
  );
};

export default App;
