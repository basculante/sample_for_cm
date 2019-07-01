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
					<Link to={`/graph/${survey.surveyId}`}>
						<div className="card survey-1">
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
			<div className="container">
				<h3>My Surveys</h3>
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
