import React from "react";
import NavBar from "../components/NavBar";

const Layout = (props) => {
  return (
    <div className="main-layout">
      <NavBar />
      <div className="inner-layout">{props.children}</div>
    </div>
  );
};

export default Layout;
