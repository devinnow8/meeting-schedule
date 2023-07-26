import React, { useState, useEffect } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { ToastContainer } from "react-toastify";
import RouteComponent from "./routes";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { UserProvider } from "../src/hooks/UserContext";
const App = () => {


  return (
    <div className="app">
      <GoogleOAuthProvider clientId="910702943231-ea6pjn20rr3jnm2iruht1hm5h026663d.apps.googleusercontent.com">
        <UserProvider>
          <ToastContainer />
          <RouteComponent />
        </UserProvider>


      </GoogleOAuthProvider>

    </div>
  );
};

export default App;
