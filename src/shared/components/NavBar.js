import React, { useState } from "react";
import { googleLogout } from "@react-oauth/google";

import logo from "../../assets/images/logo.png";
import { useNavigate } from "react-router-dom";

const NavBar = () => {
  const userId = localStorage.getItem("userId")
  const [dropdown, setDropdown] = useState(false);
  const navigate = useNavigate();

  // $("#search-icon").click(function() {
  //     $(".nav").toggleclassName("search");
  //     $(".nav").toggleclassName("no-search");
  //     $(".search-input").toggleclassName("search-active");
  //   });

  //   $('.menu-toggle').click(function(){
  //      $(".nav").toggleclassName("mobile-nav");
  //      $(this).toggleclassName("is-active");
  //   });

  const logOut = () => {
    localStorage.removeItem("userId");
    localStorage.removeItem("token");
    navigate("/login");
  };


  return (
    <header className="header">
      <div className="container">
        <nav className="navbar">
          <img src={logo} alt="Company Logo" className="logo" />

          <div className="menu-toggle" id="mobile-menu">
            <span className="bar"></span>
            <span className="bar"></span>
            <span className="bar"></span>
          </div>

          {userId !== null && (
            <ul className="nav no-search">
              {/* <li className="nav-item">
                  <a href="#">Home</a>
                </li> */}
              <li
                className="nav-item"
                onClick={() => setDropdown((prev) => !prev)}
              >

              </li>
              {dropdown && (
                <div className="user-dropdown">
                  <div className="inner">
                    <div className="user-details">
                      {/*<span className="user-name">{user.name}</span>
              <span className="user-name">{user.email}</span>*/}
                    </div>
                  </div>
                  <div className="lower">
                    <div className="logout-btn" onClick={logOut}>
                      Logout
                    </div>
                  </div>
                </div>
              )}
            </ul>
          )}
        </nav>
      </div>
    </header>
  );
};

export default NavBar;
