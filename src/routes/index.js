import React from "react";
import { useSelector } from "react-redux";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import { Home, Login, Dashboard } from "../pages";
import Layout from "../shared/layout";

const PrivateRoute = ({ children }) => {
  const user = useSelector((state) => state.loginReducer.user_details);

  if (user.id === undefined) {
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
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
};

export default RouteComponent;
