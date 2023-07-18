import React, { useState, useEffect } from "react";
import calenderIcon from "../../assets/images/calneder2.png";
import calIcon from "../../assets/images/cal-icon.png";
import { ReactComponent as GoogleIconSvg } from "../../assets/images/google-icon.svg";
import { useNavigate } from "react-router-dom";
import { useGoogleLogin } from "@react-oauth/google";
import { toast } from "react-toastify";
import axios from "axios";

const Home = () => {

  const navigate = useNavigate();




  const [loader, setLoader] = useState(false);

  // const GOOGLE_SCOPE = "openid https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email";
  const GOOGLE_SCOPE = "email profile https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile"
  const BASE_URL = "http://192.168.1.58:9000"
  const LOGIN_URL = "http://192.168.1.58:9000/login";
  const GOOGLE_AUTH_SETTINGS = {
    flow: "auth-code",
    redirect_uri: "http://localhost:3000",
    prompt: "consent",
    access_type: "offline",
    scope: GOOGLE_SCOPE,
  }

  const getAccessToken = async (tokenResponse) => {
    setLoader(true);
    const result = await axios.post(LOGIN_URL, {
      tokenResponse
    }
    );
    setLoader(false);
    const authHeader = result.headers.get("Authorization");
    const token = authHeader ? authHeader.split(" ")[1] : null;
    return token;
  };

  const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      console.log(tokenResponse, "tokenResponse");
      try {
        let returnedData = await getAccessToken({
          ...tokenResponse,
          redirectURL: GOOGLE_AUTH_SETTINGS.redirect_uri,
        });
        console.log(returnedData, "returnedData");
      } catch (err) {
        console.log(err);
      }
    },
    ...GOOGLE_AUTH_SETTINGS,

    onError: (errorResponse) => toast(errorResponse),
  });
  return (
    <>
      <div className="meeting-schedule">
        <div className="container">
          <div className="row">
            <div className="col-md-9">
              <p className="display">Displaying 0-0 of 0 Events</p>
              <div className="meeting-schedule__card">
                <div className="meeting-schedule__header">
                  <ul>
                    <li className="active">Upcoming</li>
                    <li>Inprogress</li>
                    <li>Past</li>
                  </ul>
                </div>
                <div className="meeting-schedule__content">
                  <img src={calIcon} className="img-fluid" alt="" />
                  <h5>No Events Yet</h5>
                  <p>Share event type links to schedule events</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="calender-sidebar">
          <div className="calender-sidebar__main">
            <img src={calenderIcon} className="calender-img" alt="" />
            <div className="calender-sidebar__main--btn">
              <div className="google" onClick={() => googleLogin()}>
                <GoogleIconSvg />
                {/* <img src={gmailIcon} alt="" />*/}
                <span className="google-text">Connect your Gmail</span>
              </div>

            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
