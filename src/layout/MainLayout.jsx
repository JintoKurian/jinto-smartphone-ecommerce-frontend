import { Outlet } from "react-router-dom";
import Header from "../components/Navbar";
import Footer from "../components/Footer";
import { DarkThemeToggle } from "flowbite-react";

const MainLayout = () => {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-gray-50 p-4">
        <Outlet />
      </main>
      <DarkThemeToggle />
      <Footer />
    </>
  );
};

export default MainLayout;
