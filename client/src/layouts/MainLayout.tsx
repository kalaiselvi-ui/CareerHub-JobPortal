import Footer from "../components/Footer.tsx";
import Navbar from "../components/Navbar.tsx";
import { Outlet, useLocation } from "react-router-dom";

const MainLayout = () => {
  // const hideFooter = location.pathname.startsWith("/jobs");
  const location = useLocation();
  const isJobPage = location.pathname.startsWith("/jobs");

  return (
    <div>
      <Navbar />
      <main>
        <Outlet />
      </main>
      {!isJobPage && <Footer />}
    </div>
  );
};

export default MainLayout;
