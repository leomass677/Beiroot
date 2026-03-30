import React from "react";
import Home from "../Pages/Home";
import AboutUs from "../Pages/AboutUs";
import Menu from "../Pages/Menu";
import ContactUs from "../Pages/ContactUs";
import Checkout from "../Pages/Checkout";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "../component/Layout";
import ErrorPage from "../Pages/ErrorPage";

const Router = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      errorElement: <ErrorPage />,
      children: [
        { path: "/", element: <Home /> },
        { path: "/menu", element: <Menu /> },
        { path: "/checkout", element: <Checkout /> },
        { path: "/contact", element: <ContactUs /> },
        { path: "/about", element: <AboutUs /> },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default Router;
