import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useGoogleLogin } from "@react-oauth/google";
import { ReactComponent as GoogleIconSvg } from "../../assets/images/google-icon.svg";
import calenderImg from "../../assets/images/home.png";
import { toast } from "react-toastify";
import PropTypes from 'prop-types';
import { useNylas } from '@nylas/nylas-react';
import Logo from "../../assets/images/logo.png";
import { Navigate } from "react-router-dom";
import UserContext from "../../hooks/UserContext";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState();
  const nylas = useNylas();
  const [isLoading, setIsLoading] = useState(false);

  const [disableConnect, setDisableConnect] = useState(false);
  const { user } = useContext(UserContext);

  const handleConnectEmail = (e) => {
    const checked = e.target.checked;
    setDisableConnect(checked);
  }

  useEffect(() => {
    const userToken = (localStorage.getItem('userToken')) || ''
    if (user) {
      navigate("/home")
    }
  }, [user])

  const loginUser = (e) => {
    e.preventDefault();
    setIsLoading(true);


    nylas.authWithRedirect({
      emailAddress: email,
      successRedirectUrl: '',
    });

  };

  return (
    <section className="signup-hero">
      <div className="container">
        <div className="logo">
          <Link to="/login">
            <img src={Logo} alt="schedule scence" />
          </Link>
        </div>
        <div className="signup-hero__inner">
          <div className="row align-items-center">
            <div className="col-md-5">
              <div className="signup-hero__img">
                <img src={calenderImg} alt="" />
              </div>
            </div>
            <div className="col-md-7">
              <div className="signup-hero__content">
                <h1 className="title">
                  <span>AI -Powered</span><br />
                  <span className="title-inner">Automated Scheduling</span>
                </h1>
                <p className="desc">
                  Simplify your workload with AI powered automated meeting
                  scheduler. Goodbye to manual coordination. Maximize
                  productivity. Streamline your calendar
                </p>
                <div className="signup-btn">
                  <div className="google" >
                    <form onSubmit={loginUser}>
                      <input
                        required
                        autoComplete="on"
                        type="email"
                        placeholder="Enter your email address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                      <button className={`login-btn ${disableConnect ? "login-enable" : "login-disbaled"}`} type="submit" disabled={!disableConnect}>
                        {isLoading ? 'Connecting...' : 'Connect'}
                      </button>
                    </form>
                  </div>
                </div>
                <div className="note">
                  <div className="form-check">
                    <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" checked={disableConnect} onChange={(e) => handleConnectEmail(e)} />
                    <label className="form-check-label" for="flexCheckDefault" >
                      I have been given access to check my <b>Calendar </b>.
                    </label>
                  </div>
                  <div className="imp-text">
                    <span className="Star"> *</span> Please select the checkbox to grant access to your calendar after clicking the Connect button.
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
};


export default Login;
