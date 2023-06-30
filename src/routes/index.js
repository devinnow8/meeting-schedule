import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import { Home, Login } from "../pages";
import Layout from "../shared/layout";

// import { useSelector } from "react-redux";

const PrivateRoute = ({ children }) => {
  // const { user: authUser } = useSelector(x => x.auth);
  const authUser = true;

  if (!authUser) {
    return <Navigate to="/login" />;
  }
  return children;
};

const RouteComponent = () => {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route
            path="/"
            element={
              <PrivateRoute>
                <Home />
              </PrivateRoute>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
};

export default RouteComponent;
