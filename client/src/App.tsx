import { Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout.tsx";
import { lazy, Suspense } from "react";
import LoadingSpinner from "./components/common/LoadingSpinner.tsx";

const Home = lazy(() => import("./pages/Home.tsx"));

const App = () => {
  return (
    <>
      <Suspense fallback={<LoadingSpinner />}>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Home />} />
          </Route>
        </Routes>
      </Suspense>
    </>
  );
};

export default App;
