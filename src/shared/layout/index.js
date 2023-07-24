import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar";

const Layout = (props) => {
  const navigate = useNavigate();
  const userId = JSON.parse(localStorage.getItem('userDetail'))?.id || ''


  useEffect(() => {
    console.log("userId layout: ", userId)
    if (userId === '') {
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
