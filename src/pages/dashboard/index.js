import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const STATUS_ARRAY = [
  { id: 1, name: "New", selected: true, events: [] },
  { id: 2, name: "In Progress", selected: false, events: [] },
  {
    id: 3,
    name: "Done",
    selected: false,
    events: [
      {
        id: "event_1",
        event_name: "First Event",
        participants: [
          { user_id: "user_1", user_name: "Ashish" },
          { user_id: "user_2", user_name: "Yugal" }
        ]
      },
      {
        id: "event_2",
        event_name: "Second Event",
        participants: [
          { user_id: "user_1", user_name: "Ashish" },
          { user_id: "user_2", user_name: "Yugal" }
        ]
      }
    ]
  }
];

const Dashboard = () => {
  const [statusArray, setStatusArray] = useState([...STATUS_ARRAY]);
  const navigate = useNavigate();

  const callhome = () => {
    navigate("/home");
  }
  const handleTabClick = (id) => {
    let array = [...statusArray];
    array = array.map((item) =>
      item.id === id
        ? { ...item, selected: true }
        : { ...item, selected: false }
    );
    setStatusArray([...array]);
  };

  const TableContent = () => {
    const active_tab = statusArray.find((item) => item.selected);
    console.log("j8sdf7udsbf", active_tab);

    return active_tab.events.length !== 0 ? (
      <div className="table-content not-empty">
        {active_tab.events.map((event) => (
          <div key={event.id} className="event-main">
            <h3 className="event-title">{event.event_name}</h3>
            {event.participants.length !== 0 ? (
              <div className="participants-main">
                <h2 className="participants-text">Participants:</h2>
                {event.participants.map((item) => (
                  <div key={item.user_id} className="participants-list">
                    <h3 className="participant-name">{item.user_name}</h3>
                  </div>
                ))}
              </div>
            ) : (
              <></>
            )}
          </div>
        ))}
      </div>
    ) : (
      <div className="table-content empty">
        <div className="empty-div">
          <h2 className="empty-text">{`No Events in ${active_tab.name}`}</h2>
        </div>
      </div>
    );
  };


  return (
    <div className="dashboard-container">
      <div className="table-main">
        <div className="header-main">
          <button onClick={() => callhome()}> Home</button>
          {statusArray.map((item) => (
            <div
              key={item.id}
              className="tab-item"
              onClick={() => handleTabClick(item.id)}
            >
              <span className={`tab-text ${item.selected ? "active" : ""}`}>
                {item.name}
              </span>
              {item.selected && <div className="active-border"></div>}
            </div>
          ))}
        </div>
        <TableContent />
      </div>
    </div>
  );
};

export default Dashboard;
