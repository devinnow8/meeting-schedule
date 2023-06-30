import React from "react";

const Layout = (props) => {
  return (
    <div>
      <h2>Layout</h2>
      {props.children}
    </div>
  );
};

export default Layout;
