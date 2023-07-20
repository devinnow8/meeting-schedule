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

  const GOOGLE_SCOPE =
    "email profile https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/gmail.send https://www.googleapis.com/auth/gmail.readonly";
  const BASE_URL = "https://calendar-service-agox.onrender.com";
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
        console.log(returnedData,"returnedData")
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
      const response = await axios.get(
        `${BASE_URL}/api/v1/calendarEvents/events/`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: usertoken,
          },
        }
      );
      console.log(response, "scheduleresponse");
      console.log(response.data.entry.meetings, "meeting");
      if (response.status === 200) {
        setMeeting(response.data.entry.meetings);
      }

      setLoader(false);
      console.log(meeting, "meetingmeeting");
    } catch (error) {
      console.log(error);
      setLoader(false);
    }
  };
  useEffect(() => {
    fetchEvents();
  }, [activeTab]);

  const categorizeEvents = (events) => {
    const currentTime = Math.floor(Date.now() / 1000);
    const upcomingEvents = [];
    const inprogressEvents = [];
    const pastEvents = [];

    events !== undefined &&
      events?.forEach((event) => {
        if (currentTime < event.startTime) {
          upcomingEvents.push(event);
        } else if (
          currentTime >= event.startTime &&
          currentTime <= event.endTime
        ) {
          inprogressEvents.push(event);
        } else {
          pastEvents.push(event);
        }
      });
    console.log(events, "events");
    return {
      upcoming: upcomingEvents,
      inprogress: inprogressEvents,
      past: pastEvents,
    };
  };
  const categorizedEvents = categorizeEvents(meeting);
  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };
  console.log("typemeeting");
  return (
    <>
      <div className="meeting-schedule">
        <div className="meeting-schedule__cardwrapper">
          <div className="container">
            <p className="display"></p>
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
                {loader ? (
                  <p>Loading...</p>
                ) : (
                  <>
                    {meeting?.length ? (
                      <table className="events-table">
                        <thead>
                          <tr>
                            <th>Sr No</th>
                            <th>Title</th>
                            <th>Time <br/>IST</th>
                            <th>Date</th>
                            <th>Participant</th>
                          </tr>
                        </thead>
                        <tbody>
                          {categorizedEvents[activeTab].map((event, index) => {
                            console.log(event, "eventeventevent");
                            return (
                              <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{event.title}</td>
                                <td>
                                  {new Date(
                                    event.startTime * 1000
                                  ).toLocaleTimeString([], {
                                    hour: "2-digit",
                                    minute: "2-digit",
                                  }) +
                                    "  " +
                                    new Date(
                                      event.endTime * 1000
                                    ).toLocaleTimeString([], {
                                      hour: "2-digit",
                                      minute: "2-digit",
                                    })}
                                </td>
                                <td>
                                  {" "}
                                  {new Date(
                                    event.startTime * 1000
                                  ).toLocaleDateString()}
                                </td>
                                <td className="participant">
                                  {
                                    <>
                                    {
                                      event.participants.slice(0,2).map((item) => {
                                          return <div className="badges rounded-pill text-bg-primary">{item.email}</div>;
                                    })
                                    }
                                    { event.participants.length > 2 && 
                                    <button className="tooltips">
                                      +{event.participants.length-2} more
                                      <span className="tooltipemail">
                                        {event.participants.slice(2).map((item)=>{
                                          return(
                                            <div>{item.email}</div>
                                          )
                                        })}
                                      </span>
                                    </button>} 
                                    </>
                                    
                                  }
                                </td>
                              </tr>
                            );  
                          })}
                        </tbody>
                      </table>
                    ) : (
                      <>
                        <div className="no-events">
                          <img src={calIcon} className="img-fluid" alt="" />
                          <h5>No {activeTab} Events Yet</h5>
                          <p>Share event type links to schedule events</p>
                        </div>
                      </>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="calender-sidebar">
          <div className="calender-sidebar__main">
            <img src={calenderIcon} className="calender-img" alt="" />

            <div className="calender-sidebar__main--btn">
              {(localStorage.getItem("userpicture") === "null") && (
                <div className="google" onClick={() => googleLogin()}>
                  <GoogleIconSvg />
                  <span className="google-text">Connect your Gmail</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
