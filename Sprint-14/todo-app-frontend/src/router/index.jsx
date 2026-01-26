import { createBrowserRouter, Navigate } from "react-router";
import { PublicRoute, PrivateRoute } from "../components/auth";
import Layout from "../components/layout/Layout.jsx";

// Pages
import { SignInPage, SignUpPage } from "../pages";

import { lazy, Suspense } from "react";
import { PageSpinner } from "../components/common/Spinner";

// Pages
const DashboardPage = lazy(() => import("../pages/DashboardPage"));
const ListDetailPage = lazy(() => import("../pages/ListDetailPage"));
const ProfilePage = lazy(() => import("../pages/ProfilePage"));

// eslint-disable-next-line react-refresh/only-export-components
const LazyWrapper = ({ children }) => {
  <Suspense fallback={<PageSpinner />}>{children}</Suspense>;
};

export const router = createBrowserRouter([
  // Public routes
  {
    path: "/signin",
    element: (
      <PublicRoute>
        <SignInPage />
      </PublicRoute>
    ),
  },
  {
    path: "/signup",
    element: (
      <PublicRoute>
        <SignUpPage />
      </PublicRoute>
    ),
  },
  // Private routes
  {
    path: "/",
    element: (
    //   <PrivateRoute>
        <Layout />
    //   </PrivateRoute>
    ),
    children: [
      {
        path: "/dashboard",
        element: (
          // <PrivateRoute>
          // <LazyWrapper>
          <DashboardPage />
          // </LazyWrapper>
          // </PrivateRoute>
        ),
      },
      {
        path: "/list/:listId",
        element: (
          <PrivateRoute>
            <LazyWrapper>
              <ListDetailPage />
            </LazyWrapper>
          </PrivateRoute>
        ),
      },
      {
        path: "/profile",
        element: (
          <PrivateRoute>
            <LazyWrapper>
              <ProfilePage />
            </LazyWrapper>
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: "*",
    element: <Navigate to="/dashboard" replace />,
  },
]);

export default router;
