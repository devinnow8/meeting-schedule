import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useGoogleLogin } from "@react-oauth/google";
import { ReactComponent as GoogleIconSvg } from "../../assets/images/google-icon.svg";
import calenderImg from "../../assets/images/home.png";
import { toast } from "react-toastify";
import PropTypes from 'prop-types';
import { useNylas } from '@nylas/nylas-react';

const Login = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({});
  const [email, setEmail] = useState();
  const nylas = useNylas();
  const [isLoading, setIsLoading] = useState(false);

  const loginUser = (e) => {
    e.preventDefault();
    setIsLoading(true);

    console.log("nylas", nylas)

    nylas.authWithRedirect({
      emailAddress: email,
      successRedirectUrl: '',
    });

  };

  return (
    <section className="signup-hero">
      <div className="container">
        <div className="row">
          <div className="col-md-5">
            <div className="signup-hero__img">
              <img src={calenderImg} alt="" />
            </div>
          </div>
          <div className="col-md-7">
            <div className="signup-hero__content">
              <h1 className="title">
                <span>AI -Powered</span>
                <br /> Automated Scheduling
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
                    <button className="login-btn" type="submit" disabled={isLoading}>
                      {isLoading ? 'Connecting...' : 'Connect'}
                    </button>
                  </form>
                </div>
              </div>
            </div>

            <p className="desc">
              <span className="Star"> *</span>  Gain access to our streamlined email system and simplify your meeting scheduling process effortlessly
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};


export default Login;
