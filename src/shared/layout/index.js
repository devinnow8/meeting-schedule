import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar";

const Layout = (props) => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.loginReducer.user_details);

  useEffect(() => {
    if (user.id !== undefined) {
      navigate("/");
    }
  }, [user]);

  return (
    <div className="main-layout">
      <NavBar />
      <div className="inner-layout">{props.children}</div>
    </div>
  );
};

export default Layout;
