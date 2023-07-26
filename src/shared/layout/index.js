import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import NavBar from "../components/NavBar";

const Layout = (props) => {
  const navigate = useNavigate();
  const location = useLocation();
  const userId = JSON.parse(localStorage.getItem('userDetail'))?.id || ''


  useEffect(() => {
    console.log("userId layout: ", userId)
    if (userId !== null) {
      if(location.pathname === '/login'){
        navigate("/home");
      }
    }else{
      navigate("/login");

    }
  }, []);

  return (
    <div className="main-layout">
      {userId !== '' && <NavBar />}
      <div className="inner-layout">{props.children}</div>
    </div>
  );
};

export default Layout;
