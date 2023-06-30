import React, { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useGoogleLogin } from "@react-oauth/google";
import { set_user_details } from "../../redux/login/action";
import { ReactComponent as GoogleIconSvg } from "../../assets/images/google-icon.svg";

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
              Accept: "application/json"
            }
          }
        )
        .then((res) => {
          dispatch(
            set_user_details({
              name: res.data.name,
              email: res.data.email,
              id: res.data.id,
              picture: res.data.picture
            })
          );
          navigate("/");
        })
        .catch((err) => console.log(err));
    }
  }, [user]);

  const onLogin = useGoogleLogin({
    onSuccess: (codeResponse) => setUser(codeResponse),
    onError: (error) => console.log("Login Failed:", error)
  });

  return (
    <section className="signup-hero">
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <h1 className="title">
              Take control of your time, one meeting at a time.
            </h1>
            <p className="desc">
              Empower your time management with our smart scheduling platform.
              Seamlessly coordinate meetings, optimize productivity, and regain
              control of your calendar.
            </p>
            <p className="desc">Sign up free with Google</p>
            <div className="signup-btn">
              <div className="google" onClick={onLogin}>
                {/* <GoogleLogin
                  className="h89sdfsf"
                  onSuccess={responseMessage}
                  onError={errorMessage}
                /> */}
                <GoogleIconSvg />
                <span className="google-text">Google</span>
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
