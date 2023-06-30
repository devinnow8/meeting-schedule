import React, {useEffect} from 'react';
import calenderIcon from '../../assets/images/calender.png';
import checkIcon from '../../assets/images/check.png';
import { ReactComponent as GoogleIconSvg } from '../../assets/images/google-icon.svg';

const Home = () => {
	const gapi = window.gapi;
  const google = window.google;
	const CLIENT_ID = "168070709261-77jstlj3s4hdq75lb6t5jsdurf0jp2iu.apps.googleusercontent.com"
	const API_KEY = "AIzaSyB-iV-p2fiF8KTv_hl5mlO0ADr0XZyhRe0"
	const DISCOVERY_DOC = 'https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest';
	const SCOPES = "https://www.googleapis.com/auth/calendar";
  
	const accessToken = localStorage.getItem('access_token');
	const expiresIn = localStorage.getItem('expires_in');
  
	let gapiInited = false, gisInited = false, tokenClient;

	useEffect(() => {
		//const expiryTime = new Date().getTime() + expiresIn * 1000;
		gapiLoaded()
		gisLoaded()
	  }, [])
	
	  function gapiLoaded() {
		gapi.load('client', initializeGapiClient);
	  }
	
	  async function initializeGapiClient() {
		await gapi.client.init({
		  apiKey: API_KEY,
		  discoveryDocs: [DISCOVERY_DOC],
		});
		gapiInited = true;
	
		if (accessToken && expiresIn) {
		  gapi.client.setToken({
			access_token: accessToken,
			expires_in: expiresIn,
		  });
		  getUpcomingEvents();
		}
	  }
	
	  function gisLoaded() {
		tokenClient = google.accounts.oauth2.initTokenClient({
		  client_id: CLIENT_ID,
		  scope: SCOPES,
		  callback: '', // defined later
		});
	
		gisInited = true;
	  }
	
	  //Enables user interaction after all libraries are loaded.
	
	  function handleAuthClick() {
		tokenClient.callback = async (resp) => {
		  if (resp.error) {
			throw (resp);
		  }
		  await getUpcomingEvents();
		  const { access_token, expires_in } = gapi.client.getToken();
		  localStorage.setItem('access_token', access_token);
		  localStorage.setItem('expires_in', expires_in)
		};
	
		if (!(accessToken && expiresIn)) {
		  // Prompt the user to select a Google Account and ask for consent to share their data
		  // when establishing a new session.
		  tokenClient.requestAccessToken({ prompt: 'consent' });
		} else {
		  // Skip display of account chooser and consent dialog for an existing session.
		  tokenClient.requestAccessToken({ prompt: '' });
		}
	  }
	
	  async function getUpcomingEvents() {
		let response;
		try {
		  const request = {
			'calendarId': 'primary',
			'timeMin': (new Date()).toISOString(),
			'showDeleted': false,
			'singleEvents': true,
			'maxResults': 10,
			'orderBy': 'startTime',
		  };
		  response = await gapi.client.calendar.events.list(request);
		} catch (err) {
console.log(err.message , "error===>> ");
		  return;
		}
		const events = response.result.items;
		console.log(events , "eventseventsevents");
		if (!events || events.length === 0) {
console.log("NO EVENTS FOUND");
		  return;
		}
		// Flatten to string to display
		const output = events.reduce(
		  (str, event) => `${str}${event.summary} (${event.start.dateTime || event.start.date})\n`,'Events:\n');
console.log(output , "List Of Events =====>>>");
	  }
	return (
		<>
			<div className="calender-bg">
				


				<div className="container">
					<div className="row">
						<div className="col-md-8">
							<div className="left">
								<h1 className='text-white'>content here</h1>
							</div>
						</div>
					</div>
				</div>


				

				
				<div className="calender-sidebar">
					<div className="calender-sidebar__main">
						<h2>Lorem ipsum dolor sit amet consectetur adipisicing elit</h2>
						<img src={calenderIcon} className="img-fluid" alt="" />
						<div className="calender-sidebar__main--btn">
							<div className="google">
								<GoogleIconSvg />
								<span onClick={handleAuthClick} className="google-text">Sign in & Authorize Calender</span>
							</div>
							<div className="google">
								<GoogleIconSvg />
								<span className="google-text">Google</span>
							</div>
						</div>
						<ul>
							<li>
								<img src={checkIcon} alt="" /> Lorem ipsum dolor sit amet
								consectetur, adipis
							</li>
							<li>
								<img src={checkIcon} alt="" /> Lorem ipsum dolor sit amet
								consectetur, adipis
							</li>
						</ul>
					</div>
				</div>
			</div>
		</>
	);
};

export default Home;
