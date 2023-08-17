import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Home, Login, Initial } from "../pages";
import Layout from "../shared/layout";
import PageNotFound from "../pages/pageNotFound";

const PrivateRoute = ({ children }) => {

  const userToken = (localStorage.getItem('userToken')) || ''
  if (userToken === '') {
    return <Navigate to="/login" />;
  }

  return children;
};

const RouteComponent = () => {
  const [notFound, setNotFound] = useState(false)
  return (
    <BrowserRouter>
      <Layout notFound={notFound}>
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

          {/* <Route path="*" element={<PageNotFound/>} /> */}
          <Route path="*" element={<PageNotFound setNotFound={setNotFound}/>} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
};

export default RouteComponent;
