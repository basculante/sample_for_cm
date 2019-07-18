import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { fetchMySurveys, fetchSurvey } from "../actions";
import "./Dashboard.css";

class Dashboard extends React.Component {
	componentDidMount() {
		this.props.fetchMySurveys();
		this.props.fetchSurvey();
	}

	renderSurveyCard() {
		return this.props.mySurveys.map((survey, index) => {
			return (
				<div className="col s12 m12 l6" key={survey.surveyId}>
					<Link to={{
						pathname: `/graph/${survey.surveyId}`,
						state: {
							title: survey.surveyName
						}
					}}>
						<div className="card survey">
							<span className="survey-title card-title">
								{survey.surveyName}
							</span>
						</div>
					</Link>
				</div>
			);
		});
	}

	render() {
		return (
			<div className="dashboard container">
				<h3 className="dashboard-title center">My Surveys</h3>
				<div className="dashboard-createsurvey-btn center">
					<Link to="/createsurvey">
						<button className="waves-effect waves-light btn">Create New Survey</button>
					</Link>
				</div>
				<div className="survey-group row">{this.renderSurveyCard()}</div>
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		mySurveys: state.mySurveys
	};
};

export default connect(
	mapStateToProps,
	{ fetchMySurveys, fetchSurvey }
)(Dashboard);
