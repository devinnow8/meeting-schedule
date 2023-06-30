import React from 'react';
import calenderIcon from '../../assets/images/calender.png';
import checkIcon from '../../assets/images/check.png';
import { ReactComponent as GoogleIconSvg } from '../../assets/images/google-icon.svg';

const Home = () => {
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
				<aside className="calender-sidebar">
					<div className="calender-sidebar__main">
						<h2>Lorem ipsum dolor sit amet consectetur adipisicing elit</h2>
						<img src={calenderIcon} className="img-fluid" alt="" />
						<div className="calender-sidebar__main--btn">
							<div className="google">
								<GoogleIconSvg />
								<span className="google-text">Google</span>
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
				</aside>
			</div>
		</>
	);
};

export default Home;
