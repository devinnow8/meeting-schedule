import React from "react";
import NavBar from "../../pages/navigation/NavBar"

const Layout = (props) => {

  return <div>
    <div><NavBar /></div>
    
    {props.children}</div>;
};

export default Layout;
