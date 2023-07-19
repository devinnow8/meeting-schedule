
import React, { useState, useEffect } from "react";
import calenderIcon from "../../assets/images/calneder2.png";
import calIcon from "../../assets/images/cal-icon.png";
import { ReactComponent as GoogleIconSvg } from "../../assets/images/google-icon.svg";
import { useGoogleLogin } from "@react-oauth/google";
import { toast } from "react-toastify";
import axios from "axios";

const Home = () => {
  const [loader, setLoader] = useState(false);
  const [meeting, setMeeting] = useState([]);
  const [activeTab, setActiveTab] = useState("upcoming");
  const [auth, setAuth] = useState("false")
  const GOOGLE_SCOPE =
    "email profile https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile";
  const BASE_URL = "http://192.168.1.58:9000";
  const LOGIN_URL = "http://192.168.1.58:9000/login";
  const GOOGLE_AUTH_SETTINGS = {
    flow: "auth-code",
    redirect_uri: "http://localhost:3000",
    prompt: "consent",
    access_type: "offline",
    scope: GOOGLE_SCOPE,
  };
  const usertoken = localStorage.getItem("token");
  const getAccessToken = async (tokenResponse) => {
    setLoader(true);
    const result = await axios.post(LOGIN_URL, {
      tokenResponse,
    });
    setLoader(false);
    const authHeader = result.headers.get("Authorization");
    const token = authHeader ? authHeader.split(" ")[1] : null;
    return token;
  };

  const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      console.log(tokenResponse, "tokenResponse");
      try {
        const returnedData = await getAccessToken({
          ...tokenResponse,
          redirectURL: GOOGLE_AUTH_SETTINGS.redirect_uri,
        });
        if (returnedData.length > 0) {
          setAuth("true")
        }
        console.log(returnedData, auth, "returnedData");
      } catch (err) {
        console.log(err);
      }
    },
    ...GOOGLE_AUTH_SETTINGS,

    onError: (errorResponse) => toast(errorResponse),
  });

  const fetchEvents = async () => {
    setLoader(true);
    try {
      const response = await axios.get(`${BASE_URL}/api/v1/calendarEvents/events/`, {
        headers: {
          "Content-Type": "application/json",
          'Authorization': usertoken,
        }
      },
      );
      console.log(response, "scheduleresponse");
      console.log(response.data.entry.meetings, "meeting");
      setMeeting(response.data.entry.meetings);
      setLoader(false)
      console.log(meeting, "meetingmeeting");
    } catch (error) {
      console.log(error);
      setLoader(false)
    }
  };
  useEffect(() => {
    fetchEvents();
  }, [activeTab])

  const categorizeEvents = (events) => {
    const currentTime = Math.floor(Date.now() / 1000);
    const upcomingEvents = [];
    const inprogressEvents = [];
    const pastEvents = [];

    events.forEach((event) => {
      if (currentTime < event.startTime) {
        upcomingEvents.push(event);
      } else if (currentTime >= event.startTime && currentTime <= event.endTime) {
        inprogressEvents.push(event);
      } else {
        pastEvents.push(event);
      }
    });

    return { upcoming: upcomingEvents, inprogress: inprogressEvents, past: pastEvents };
  };
  const categorizedEvents = categorizeEvents(meeting);
  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };
  console.log(meeting, "typemeeting", categorizedEvents);
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
                    <li
                      className={activeTab === "upcoming" ? "active" : ""}
                      onClick={() => handleTabClick("upcoming")}
                    >
                      Upcoming
                    </li>
                    <li
                      className={activeTab === "inprogress" ? "active" : ""}
                      onClick={() => handleTabClick("inprogress")}
                    >
                      Inprogress
                    </li>
                    <li
                      className={activeTab === "past" ? "active" : ""}
                      onClick={() => handleTabClick("past")}
                    >
                      Past
                    </li>
                  </ul>
                </div>
                <div className="meeting-schedule__content">
                  {loader ?
                    <p>Loading...</p>
                    :
                    <>
                      {
                        meeting.length === 0 ?
                          <div className="no-events">
                            <img src={calIcon} className="img-fluid" alt="" />
                            <h5>No {activeTab} Events Yet</h5>
                            <p>Share event type links to schedule events</p>
                          </div>
                          :
                          <table className="events-table">
                            <thead>
                              <tr>
                                <th>ID</th>
                                <th>Title</th>
                                <th>Status</th>
                              </tr>
                            </thead>
                            <tbody>

                              {categorizedEvents[activeTab].map((event) => {
                                console.log(event, 'eventeventevent');
                                return (
                                  <tr key={event.id}>

                                    <td>{event.title}</td>
                                    <td>{event.description}</td>

                                    <td>{event.status}</td>

                                  </tr>
                                )
                              }
                              )}
                            </tbody>
                          </table>

                      }</>
                  }
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="calender-sidebar">
          <div className="calender-sidebar__main">
            <img src={calenderIcon} className="calender-img" alt="" />

            <div className="calender-sidebar__main--btn">
              {
                (auth === "false") && (
                  <div className="google" onClick={() => googleLogin()}>
                    <GoogleIconSvg />
                    <span className="google-text">Connect your Gmail</span>
                  </div>
                )
              }
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
