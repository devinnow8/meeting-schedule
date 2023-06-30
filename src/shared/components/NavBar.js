import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { googleLogout } from "@react-oauth/google";
import { useSelector, useDispatch } from "react-redux";

import logo from "../../assets/images/logo.png";
import { set_user_details } from "../../redux/login/action";

const NavBar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [dropdown, setDropdown] = useState(false);
  const user = useSelector((state) => state.loginReducer.user_details);
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
    googleLogout();
    dispatch(set_user_details({}));
    setDropdown(false);
    navigate("/login");
  };

  return (
    <div className="page-wrapper">
      <div className="nav-wrapper">
        <div className="grad-bar"></div>
        <nav className="navbar">
          <img src={logo} alt="Company Logo" className="logo" />
          <div className="menu-toggle" id="mobile-menu">
            <span className="bar"></span>
            <span className="bar"></span>
            <span className="bar"></span>
          </div>
          {user.id !== undefined && (
            <ul className="nav no-search">
              {/* <li className="nav-item">
                  <a href="#">Home</a>
                </li> */}
              <li
                className="nav-item"
                onClick={() => setDropdown((prev) => !prev)}
              >
                <img alt="" src={user.picture} />
              </li>
              {dropdown && (
                <div className="user-dropdown">
                  <div className="inner">
                    <img alt="" src={user.picture} className="user-img" />
                    <div className="user-details">
                      <span className="user-name">{user.name}</span>
                      <span className="user-name">{user.email}</span>
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
    </div>
  );
};

export default NavBar;
