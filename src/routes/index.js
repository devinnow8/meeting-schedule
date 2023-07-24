import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import { Home, Login, Initial } from "../pages";
import Layout from "../shared/layout";

const PrivateRoute = ({ children }) => {
  const userId = JSON.parse(localStorage.getItem('userDetail'))?.id || ''
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

          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
};

export default RouteComponent;
