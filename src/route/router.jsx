import React, { Suspense } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "../component/Layout";
import ErrorPage from "../Pages/ErrorPage";
import { CardSkeleton } from "../component/Skeleton";

// Lazy load heavy pages for better code splitting
const Home = React.lazy(() => import("../Pages/Home"));
const Menu = React.lazy(() => import("../Pages/Menu"));
const Checkout = React.lazy(() => import("../Pages/Checkout"));
const ContactUs = React.lazy(() => import("../Pages/ContactUs"));
const AboutUs = React.lazy(() => import("../Pages/AboutUs"));

// Loading fallback component
const PageLoader = () => (
  <div className="w-full h-screen flex items-center justify-center">
    <div className="space-y-4">
      <CardSkeleton />
    </div>
  </div>
);

const Router = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      errorElement: <ErrorPage />,
      children: [
        {
          path: "/",
          element: (
            <Suspense fallback={<PageLoader />}>
              <Home />
            </Suspense>
          ),
        },
        {
          path: "/menu",
          element: (
            <Suspense fallback={<PageLoader />}>
              <Menu />
            </Suspense>
          ),
        },
        {
          path: "/checkout",
          element: (
            <Suspense fallback={<PageLoader />}>
              <Checkout />
            </Suspense>
          ),
        },
        {
          path: "/contact",
          element: (
            <Suspense fallback={<PageLoader />}>
              <ContactUs />
            </Suspense>
          ),
        },
        {
          path: "/about",
          element: (
            <Suspense fallback={<PageLoader />}>
              <AboutUs />
            </Suspense>
          ),
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default Router;
