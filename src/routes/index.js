import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import { Home, Login, Dashboard, Initial } from "../pages";
import Layout from "../shared/layout";

const PrivateRoute = ({ children }) => {
  console.log("userroute", localStorage.getItem("userId"));
  const userId = localStorage.getItem("userId");
  if (userId === null) {
    return <Navigate to="/login" />;
  }

  return children;
};

const RouteComponent = () => {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Initial />
          }
          />
          <Route
            path="/home"
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
