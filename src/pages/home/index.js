import React, { useState, useEffect } from "react";
import calIcon from "../../assets/images/cal-icon.png";
import { ReactComponent as GoogleIconSvg } from "../../assets/images/google-icon.svg";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import Upcoming from "../../assets/images/icons/upcoming.png";
import Past from "../../assets/images/icons/past.png";
import InProgress from "../../assets/images/icons/inprogress.png";
import UpcomingWhite from "../../assets/images/icons/upcoming-white.png";
import PastWhite from "../../assets/images/icons/past-white.png";
import InProgressWhite from "../../assets/images/icons/inprogress-white.png";
import ArrowRight from "../../assets/images/icons/arrow-right.png";
import modalImg from "../../assets/images/modal-img.png";
import 'animate.css';
import ArrowRightWhite from "../../assets/images/icons/arrow-right-white.png";
import { showToast } from "../toast"

const Home = () => {
  const [loader, setLoader] = useState(false);
  const [meeting, setMeeting] = useState([]);
  const [activeTab, setActiveTab] = useState("upcoming");
  const [showModal, setShowModal] = useState(false);
  const [showGmailModal, setShowGmailModal] = useState(false);
  const [returnedData, setReturnedData] = useState({})


  const GOOGLE_SCOPE =
    "email profile https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/gmail.send https://www.googleapis.com/auth/gmail.readonly";
  const BASE_URL = "https://calendar-service-agox.onrender.com";
  const LOGIN_URL = "https://calendar-service-agox.onrender.com/login";
  const GOOGLE_AUTH_SETTINGS = {
    flow: "auth-code",
    redirect_uri: "http://localhost:3000",
    prompt: "consent",
    access_type: "offline",
    scope: GOOGLE_SCOPE,
  };
  const usertoken = JSON.parse(localStorage.getItem('userDetail'))?.token || ''

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
        if (returnedData) {
          console.log("weyfudsf")
        }
        console.log(!!returnedData, typeof returnedData, "qw8rysgfdfdf")
        console.log(returnedData, "returnedData")
        localStorage.setItem("returnedData", JSON.stringify(returnedData));
        if (returnedData) {
          showToast.success("  Connected successfully");
          setShowModal(true)
        }
        setReturnedData(returnedData)
      } catch (err) {
        console.log(err);
      }
    },
    ...GOOGLE_AUTH_SETTINGS,

    onError: (errorResponse) => showToast(errorResponse),
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

  useEffect(() => {
    setUserEmailButton()
  }, [])
  useEffect(() => {
    setUserEmailButton()
  }, [returnedData])

  useEffect(() => {
    setUserEmailButton()
  }, [showModal])
  console.log("qyruwegfdjsfd", returnedData)
  const categorizeEvents = (events) => {
    const currentTime = Math.floor(Date.now() / 1000);
    const upcomingEvents = [];
    const inprogressEvents = [];
    const pastEvents = [];
    events !== undefined &&
      events?.forEach((event) => {
        console.log('currentTime', currentTime, 'event.startTime', event.startTime)
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

  const setUserEmailButton = () => {
    const userDetail = JSON.parse(localStorage.getItem('userDetail'))
    const returnedData = JSON.parse(localStorage.getItem('returnedData'))
    if (userDetail && userDetail.picture === null && !returnedData) {
      setShowGmailModal(true);
    } else {
      setShowGmailModal(false);
    }
  }

  // toast('message', {
  //   toastId: 'message',
  //   type: "success",
  //   position: "top-right",
  //   autoClose: 1500,
  //   hideProgressBar: false,
  //   closeOnClick: true,
  //   pauseOnHover: true,
  //   draggable: false,
  //   progress: undefined,
  //   style: {
  //     fontFamily: "inherit",
  //     fontSize: "15px",
  //     fontWeight: 500,
  //     marginBottom: "7px",
  //     display: "inlineBlock",
  //     color: "#198754",
  //   },
  // });
  return (
    <>
      <div className="meeting-schedule">
        <div className="calender-sidebar">
          <div className="calender-sidebar__main">
            {/* <img src={calenderIcon} className="calender-img" alt="" /> */}
            <ul>
              <li className={activeTab === "upcoming" ? "active" : ""}
                onClick={() => handleTabClick("upcoming")}>
                <div className="sidebar-icon">
                  <img src={activeTab === "upcoming" ? UpcomingWhite : Upcoming} alt="Upcoming" />
                </div>
                <span className="sidebar-text">Upcoming</span>
                <div className="sidebar-arrow-icon">
                  <img src={activeTab === "upcoming" ? ArrowRightWhite : ArrowRight} alt="ArrowRight" />
                </div>
              </li>

              <li className={activeTab === "inprogress" ? "active" : ""}
                onClick={() => handleTabClick("inprogress")}>
                <div className="sidebar-icon">
                  <img src={activeTab === "inprogress" ? InProgressWhite : InProgress} alt="InProgress" />
                </div>
                <span className="sidebar-text">In Progress</span>
                <div className="sidebar-arrow-icon">
                  <img src={activeTab === "inprogress" ? ArrowRightWhite : ArrowRight} alt="ArrowRight" />
                </div>
              </li>

              <li className={activeTab === "past" ? "active" : ""}
                onClick={() => handleTabClick("past")}>
                <div className="sidebar-icon">
                  <img src={activeTab === "past" ? PastWhite : Past} alt="Past" />
                </div>
                <span className="sidebar-text">Past</span>
                <div className="sidebar-arrow-icon">
                  <img src={activeTab === "past" ? ArrowRightWhite : ArrowRight} alt="ArrowRight" />
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div className="meeting-schedule__cardwrapper">
          <div className="meeting-schedule__card">
            <div className="meeting-schedule__header">

            </div>
            {/* <div className="meeting-schedule__content"> */}
            <p className="breadCrumb-title">{activeTab}</p>
            <div className={loader === true ? "meeting-schedule__content content_load" : "meeting-schedule__content"}>
              {loader ? (
                <p>Loading...</p>
              ) : (
                <>
                  {meeting?.length ? (
                    <table className="events-table">
                      <thead>
                        <tr>
                          <th>S. No</th>
                          <th>Title</th>
                          <th>Start Time (IST)</th>
                          <th>End Time (IST)</th>
                          <th>Date</th>
                          <th>Participants</th>
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
                                })} </td>
                              <td>
                                {new Date(
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
                              <td>
                                <div className="participant">
                                  {
                                    <>
                                      {
                                        event.participants.slice(0, 1).map((item) => {
                                          return <div className="badges rounded-pill">
                                            <span className="email-title">{item.email.slice(0, 1).toUpperCase()}</span>
                                            <span className="ms-1">{item.email}</span>
                                          </div>
                                        })
                                      }

                                      {event.participants.length > 1 &&
                                        <button className="tooltips">
                                          <span className="tooltips-text">
                                            +{event.participants.length - 1} more
                                          </span>
                                          {
                                            <div className="tooltipsEmail">
                                              <div className="moreemail-title">
                                                <h4>Participants</h4>
                                              </div>
                                              {event?.participants?.slice(1).map((item) => {
                                                return (
                                                  <div className="mail">
                                                    <span className="email-title">
                                                      {item.email.slice(0, 1).toUpperCase()}
                                                    </span>
                                                    <span className="email-text">{item.email}</span>
                                                  </div>
                                                )
                                              })}
                                            </div>
                                          }
                                        </button>}
                                    </>
                                  }
                                </div>
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
        <div className="calender-sidebar__main--btn  ">

          {showGmailModal && (

            <div className="modal confirm-modal  " role="dialog" >
              <div className="modal-dialog animate__animated animate__backInDown" role="document">
                <div className="modal-content">
                  <div className="modal-header">
                    <img src={modalImg} alt="modalImg" />
                  </div>
                  <div className="modal-body">
                    <h5 className="modal-title">Give access to read and send Email</h5>
                    <button className="google" onClick={() => googleLogin()}>
                      <GoogleIconSvg />
                      <span className="google-text">Connect your Gmail</span>
                    </button>
                    <p>  <span className="star">*</span>By clicking on it, you give us access to read your email for a better meeting schedule</p>
                  </div>

                </div>
              </div>
            </div>

          )}

        </div>
      </div>
    </>
  );
};

export default Home;
