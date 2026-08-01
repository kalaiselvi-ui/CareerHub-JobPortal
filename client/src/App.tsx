import { Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout.tsx";
import { lazy, Suspense } from "react";
import LoadingSpinner from "./components/common/LoadingSpinner.tsx";
import Register from "./pages/auth/Register.tsx";
import Login from "./pages/auth/Login.tsx";

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
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/companies" element={<Companies />} />
            <Route path="/about" element={<About />} />
          </Route>
        </Routes>
      </Suspense>
    </>
  );
};

export default App;
