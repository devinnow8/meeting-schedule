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
    sessionStorage.setItem('userEmail', email);
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
                  {/* <GoogleLogin
                  className="h89sdfsf"
                  onSuccess={responseMessage}
                  onError={errorMessage}
                /> */}

                  {/*   <GoogleIconSvg />

                  <span className="google-text">Continue with Google</span>*/}
                  <section className="login">
                    <form onSubmit={loginUser}>
                      <input
                        required
                        type="email"
                        placeholder="Email Address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                      <button type="submit" disabled={isLoading}>
                        {isLoading ? 'Connecting...' : 'Connect email'}
                      </button>
                    </form>
                  </section>
                </div>
              </div>
            </div>
            {/* <p>OR</p>
            <p className="desc">
              <a href="">Sign up free with email.</a> No credit card required
            </p> */}
          </div>
        </div>
      </div>
    </section>
  );
};


export default Login;
