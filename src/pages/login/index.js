import React from "react";
import { GoogleLogin } from "@react-oauth/google";
import { ReactComponent as GoogleIconSvg } from "../../assets/images/google-icon.svg";

const Login = () => {
  const responseMessage = (response) => {
    console.log(response);
  };
  const errorMessage = (error) => {
    console.log(error);
  };

  return (
    <section className="signup-hero">
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <h1 className="title">Take control of your time, one meeting at a time.</h1>
            <p className="desc">
            Empower your time management with our smart scheduling platform. Seamlessly coordinate meetings, optimize productivity, and regain control of your calendar.
            </p>
            <p className="desc">Sign up free with Google</p>
            <div className="signup-btn">
              <div className="google">
                <GoogleLogin
                  className="h89sdfsf"
                  onSuccess={responseMessage}
                  onError={errorMessage}
                />
                {/* <GoogleIconSvg />
                <span className="google-text">Google</span> */}
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
