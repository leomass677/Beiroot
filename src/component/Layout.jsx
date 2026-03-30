import React from "react";
import { Link, Outlet } from "react-router-dom";
import Footer from "../component/Footer";
import Navbar from "../component/Navbar";

const Layout = () => {
  return (
    <div>
      <Navbar />

      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
