import React, { useState, useEffect, useContext } from "react";
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
import { showToast } from "../toast";
import UserContext from "../../hooks/UserContext";

const Home = () => {
  const { user } = useContext(UserContext);
  const [loader, setLoader] = useState(false);
  const [meeting, setMeeting] = useState([]);
  const [activeTab, setActiveTab] = useState("upcoming");
  const [showGmailModal, setShowGmailModal] = useState(false);
  const [returnedData, setReturnedData] = useState('')
  const [disableGBtn, setDisableGBtn] = useState(false);

const BASE_URL = process.env.REACT_APP_BASE_URL;
const GOOGLE_SCOPE = process.env.REACT_APP_GOOGLE_SCOPE;
const REDIRECT_URI = process.env.REACT_APP_REDIRECT_URI;
console.log(GOOGLE_SCOPE,'GOOGLE_SCOPEGOOGLE_SCOPE==>>')
const url = `email profile ${GOOGLE_SCOPE}userinfo.email ${GOOGLE_SCOPE}userinfo.profile ${GOOGLE_SCOPE}gmail.send  ${GOOGLE_SCOPE}gmail.readonly`

console.log(BASE_URL,"BASE_URL");
console.log(GOOGLE_SCOPE,"GOOGLE_SCOPE")
console.log(url,"url")

  const GOOGLE_AUTH_SETTINGS = {
    flow: "auth-code",
    redirect_uri: REDIRECT_URI,
    prompt: "consent",
    access_type: "offline",
    scope: url,
  };
  const usertoken = (localStorage.getItem('userToken'));

  console.log(user, 'useruseruser');

  const getAccessToken = async (tokenResponse) => {
    console.log(tokenResponse,'fghffgh ');
    setLoader(true);
    const result = await axios.post(`${BASE_URL}/login`, {
      tokenResponse,
    });
    console.log(result,'resultresult=>');
    setLoader(false);
    const authHeader = result.headers.get("Authorization");
    const token = authHeader ? authHeader.split(" ")[1] : null;
    return token;
  };

  const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        console.log(tokenResponse, "tokenResponse",REDIRECT_URI);
        const returnedData = await getAccessToken({
          ...tokenResponse,
          redirect_uri: REDIRECT_URI,
        });
        console.log(returnedData,'returnedDatareturnedDatareturnedData');
        if (returnedData) {
          localStorage.setItem("returnedData",(returnedData));
          // showToast.success("Connected successfully");
          setReturnedData(returnedData)
        }
      } catch (err) {
        console.log(err,'errrrrrrrr==>>');
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

  const setUserEmailButton = () => {
    const returnedData = (localStorage.getItem('returnedData'))
    if (user && user?.picture === null && !returnedData) {      
      setShowGmailModal(true);
    } else {
      setShowGmailModal(false);
    }
  }

  const categorizeEvents = (events) => {
    console.log(events, "eventeventevent")
    const currentTime = Math.floor(Date.now() / 1000);
    const upcomingEvents = [];
    const inprogressEvents = [];
    const pastEvents = [];
    events !== undefined && events?.forEach((event) => {
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

  const handleGoogleButton = (e) => {
    const checked = e.target.checked;
    setDisableGBtn(checked);
  }
  useEffect(() => {
    fetchEvents();
  }, [activeTab]);

  useEffect(() => {
    if (user?.emailAddress) {
      fetchEvents();
    }
  }, [user?.emailAddress]);

  useEffect(setUserEmailButton, [user]);

  useEffect(setUserEmailButton, [user, returnedData]);


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

              <li className={activeTab === "in Progress" ? "active" : ""}
                onClick={() => handleTabClick("in Progress")}>
                <div className="sidebar-icon">
                  <img src={activeTab === "in Progress" ? InProgressWhite : InProgress} alt="InProgress" />
                </div>
                <span className="sidebar-text">In Progress</span>
                
                <div className="sidebar-arrow-icon">
                  <img src={activeTab === "in Progress" ? ArrowRightWhite : ArrowRight} alt="ArrowRight" />
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
                  {categorizedEvents[activeTab]?.length > 0 ? (
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
                        <h5>No {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Events Yet</h5>
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
            <div className="modal confirm-modal" role="dialog" >
              <div className="modal-dialog animate__animated animate__backInDown" role="document">
                <div className="modal-content">
                  <div className="modal-header">
                    <img src={modalImg} alt="modalImg" />
                  </div>
                  <div className="modal-body">
                    <h5 className="modal-title">Give access to read and send Email</h5>
                    <button className={`googleBtn ${!disableGBtn ? 'googleDisable' : 'googleEnable'}`} onClick={() => googleLogin()} disabled={!disableGBtn}>
                      <GoogleIconSvg />
                      <span className="google-text">Connect your Gmail</span>
                    </button>
                    <p className="text-start">
                      <div className="form-check">
                        <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" checked={disableGBtn} onChange={(e) => handleGoogleButton(e)} />
                        <label className="form-check-label" for="flexCheckDefault" >
                          By granting access, you authorize the ability to read and send emails, facilitating a more efficient meeting scheduling process.
                        </label>
                      </div>
                    </p>
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
