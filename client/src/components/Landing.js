import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import "./Landing.css";

class Landing extends React.Component {
	render() {
		return (
			<div className="landing">
				<div className="child-mind-logo">
					<img
						className="responsive-img"
						src={require("./images/child_mind_logo.png")}
					/>
				</div>
				<div>
					<Link to="/dashboard">
						<button className="dashboard-btn waves-effect waves-light purple darken-2 btn">
							Dashboard
						</button>
					</Link>
				</div>
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		auth: state.auth
	};
};

export default connect(mapStateToProps)(Landing);
