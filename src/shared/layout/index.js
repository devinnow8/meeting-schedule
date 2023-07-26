import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import NavBar from "../components/NavBar";

const Layout = (props) => {
  const navigate = useNavigate();
  const location = useLocation();
  const userToken = JSON.parse(localStorage.getItem('userToken')) || ''

  useEffect(() => {
    if (userToken !== '') {
      if (location.pathname === '/login') {
        navigate("/home");
      }
    } else {
      navigate("/login");

    }
  }, []);

  return (
    <div className="main-layout">
      {userToken !== '' && <NavBar />}
      <div className="inner-layout">{props.children}</div>
    </div>
  );
};

export default Layout;
