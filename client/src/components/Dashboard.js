import React from "react";
import { Link } from "react-router-dom";
import "./Dashboard.css";

class Dashboard extends React.Component {
	render() {
		return (
			<div className="container">
				<div className="survey-group row">
					<div className="col s12 m12 l6">
						<Link to="/survey1">
							<div className="card survey-1">
								<span className="survey-title card-title">Survey 1</span>
							</div>
						</Link>
					</div>
					<div className="col s12 m12 l6">
						<Link to="/survey1">
							<div className="card survey-2">
								<span className="survey-title card-title">Survey 2</span>
							</div>
						</Link>
					</div>
					<div className="col s12 m12 l6">
						<Link to="/survey1">
							<div className="card survey-3">
								<span className="survey-title card-title">Survey 3</span>
							</div>
						</Link>
					</div>
					<div className="col s12 m12 l6">
						<Link to="/survey1">
							<div className="card survey-4">
								<span className="survey-title card-title">Survey 4</span>
							</div>
						</Link>
					</div>
				</div>
			</div>
		);
	}
}

export default Dashboard;
