import React, { useState, useContext } from "react";
import logo from "../../assets/images/logo.png";
import { useNavigate } from "react-router-dom";
import { AiOutlineLogout } from "react-icons/ai";
import User from "../../assets/images/user.png";
import DownArrow from "../../assets/images/down-arrow.png";
import { AiOutlineUser } from "react-icons/ai";
import UserContext from "../../hooks/UserContext";
const NavBar = () => {
  const { user, setUser } = useContext(UserContext);
  const [dropdown, setDropdown] = useState(false);
  const navigate = useNavigate();
  const logOut = () => {
    localStorage.clear();
    setUser(null)
    navigate("/login");
  };

  return (
    <header className="header">
      <div className="container-fluid">
        <nav className="navbar">
          <img src={logo} alt="Company Logo" className="logo" />

          <div className="menu-toggle" id="mobile-menu">

          </div>

          {user?._id !== 'null' && (
            <ul className="nav no-search" >
              <li
                className="nav-item user-profile"
                onClick={() => setDropdown((prev) => !prev)}
              >
                {user?.picture !== '' ?
                  <>
                    <img src={user?.picture} alt="user" className="user-name" referrerPolicy="no-referrer" />
                    <span className="user-name">{user?.name} <img src={DownArrow} alt="arrow down" /></span>
                  </>
                  :
                  <>
                    <img src={User} alt="default user" className="user-name" />
                    <span className="user-name">{user?.email} <img src={DownArrow} alt="arrow down" /></span>
                  </>
                }
              </li>
              {dropdown && (
                <div className="user-dropdown">
                  <div className="inner">
                    <div className="user-details">
                      {
                        user?.name !== "null" ? (<>
                          <span className="user-name"> <AiOutlineUser /> <span className="ms-2">{user?.email}</span></span>
                        </>
                        ) : (
                          <span></span>
                        )
                      }
                      <div className="logout-btn" >
                        <span onClick={logOut} className="logout-btn__inner">
                          <AiOutlineLogout />
                          <span className="logout-text">Logout</span>
                        </span>
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
