import React, { useState } from "react";
import logo from "../../assets/images/logo.png";
import { useNavigate } from "react-router-dom";
import { AiOutlineLogout } from "react-icons/ai";
import User from "../../assets/images/user.png";
import DownArrow from "../../assets/images/down-arrow.png";
const NavBar = () => {
  const userDetails = JSON.parse(localStorage.getItem('userDetail'))
  const imageurl = userDetails?.picture || ''
  const userName = userDetails?.name || ''
  const userId = userDetails?.id || ''
  const userEmail = userDetails?.emailAddress || ''

  const [dropdown, setDropdown] = useState(false);
  const navigate = useNavigate();
  const logOut = () => {
    localStorage.clear();
    navigate("/login");
  };


  console.log(userName, "userName")

  console.log(typeof imageurl, "imageurl")

  return (
    <header className="header">
      <div className="container-fluid">
        <nav className="navbar">
          <img src={logo} alt="Company Logo" className="logo" />

          <div className="menu-toggle" id="mobile-menu">

          </div>

          {userId !== 'null' && (
            <ul className="nav no-search">

              <li
                className="nav-item user-profile"
                onClick={() => setDropdown((prev) => !prev)}
              >
                {imageurl !== '' ?
                  <>
                    <img src={imageurl} alt="user" className="user-name" referrerPolicy="no-referrer" />
                    <span className="user-name">{userName} <img src={DownArrow} alt="arrow down" /></span>
                  </>
                  :
                  <>
                    <img src={User} alt="default user" className="user-name" />
                    <span className="user-name">{userEmail} <img src={DownArrow} alt="arrow down" /></span>
                  </>
                }
              </li>
              {dropdown && (
                <div className="user-dropdown">
                  <div className="inner">
                    <div className="user-details">
                      {
                        userName !== "null" ? (
                          <span className="user-name">{userDetails?.emailAddress || ''}</span>
                        ) : (
                          <span></span>
                        )
                      }
                      <div className="logout-btn" onClick={logOut}>
                        <AiOutlineLogout /> <span>Logout</span>
                      </div>
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
