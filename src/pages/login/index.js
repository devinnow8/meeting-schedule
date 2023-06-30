import React from "react";
import { ReactComponent as GoogleIconSvg } from "../../assets/images/google-icon.svg";

const Login = () => {
  return (
    <section className="signup-hero">
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <h1 className="title">Lorem scheduling ipsum</h1>
            <p className="desc">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Voluptatem reiciendis amet dignissimos voluptas quasi nam? Ratione
              rerum in ex, cupiditate provident voluptatum odit ipsam labor
            </p>
            <p className="desc">Sign up free with Google</p>
            <div className="signup-btn">
              <div className="google">
                {/* <img src={googleLogo} className="img-fluid" alt="" />{" "} */}
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
