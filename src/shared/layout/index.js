import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar";

const Layout = (props) => {
  const navigate = useNavigate();


  useEffect(() => {
    const userId = localStorage.getItem("userId");
    console.log("userId layout: ", userId)
    if (!userId) {
      navigate("/login");
    }
  }, []);

  return (
    <div className="main-layout">
      <NavBar />
      <div className="inner-layout">{props.children}</div>
    </div>
  );
};

export default Layout;
