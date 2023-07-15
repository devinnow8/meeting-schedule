import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./assets/styles/main.scss";
import reportWebVitals from "./reportWebVitals";
import { NylasProvider } from '@nylas/nylas-react';


const root = ReactDOM.createRoot(document.getElementById("root"));
const SERVER_URI = 'http://192.168.1.58:9000/api/v1/calendar';
root.render(
  // http://192.168.1.58:9000/login
  <React.StrictMode>
    <NylasProvider serverBaseUrl={SERVER_URI}>
      <App />
    </NylasProvider>
  </React.StrictMode>

);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
