import React, { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useGoogleLogin } from "@react-oauth/google";
import { set_user_details } from "../../redux/login/action";
import { ReactComponent as GoogleIconSvg } from "../../assets/images/google-icon.svg";
import calenderImg from "../../assets/images/home.png";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [user, setUser] = useState({});

  useEffect(() => {
    if (user.access_token !== undefined) {
      axios
        .get(
          `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`,
          {
            headers: {
              Authorization: `Bearer ${user.access_token}`,
              Accept: "application/json",
            },
          }
        )
        .then((res) => {
          dispatch(
            set_user_details({
              name: res.data.name,
              email: res.data.email,
              id: res.data.id,
              picture: res.data.picture,
            })
          );
          navigate("/");
        })
        .catch((err) => console.log(err));
    }
  }, [user]);

  const onLogin = useGoogleLogin({
    onSuccess: (codeResponse) => setUser(codeResponse),
    onError: (error) => console.log("Login Failed:", error),
  });

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
                <div className="google" onClick={onLogin}>
                  {/* <GoogleLogin
                  className="h89sdfsf"
                  onSuccess={responseMessage}
                  onError={errorMessage}
                /> */}
                  <GoogleIconSvg />
                  <span className="google-text">Continue with Google</span>
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
