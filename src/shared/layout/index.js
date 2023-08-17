import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import NavBar from "../components/NavBar";

  const Layout = (props) => {
  const navigate = useNavigate();
  const location = useLocation();
  const userToken = (localStorage.getItem('userToken'))

  useEffect(() => {
    if (userToken !== '') {
      if (location.pathname === '/login') {
        navigate("/home");
      }
    } else {
      navigate("/login");
    }
  }, []);
  console.log(location,'locationlocation', props);
  return (
    <div className="main-layout">
      {userToken && userToken !== '' && !props.notFound && <NavBar />}
      <div className="inner-layout">{props.children}</div>
    </div>
  );
};

export default Layout;
