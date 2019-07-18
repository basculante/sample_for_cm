import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { fetchAllSurveys, fetchSurvey, fetchMyCompletedSurveys } from "../actions";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

import "./Landing.css";

class Landing extends React.Component {
	componentDidMount() {
		this.props.fetchAllSurveys();
		this.props.fetchSurvey();
		this.props.fetchMyCompletedSurveys();
	}

	renderSurveyListAuth() {
		return this.props.surveys.map((survey, index) => {
			if (!this.props.mySurveys.includes(survey.surveyId)) {
				return (
					<div key={survey.surveyId}>
						<ul className="collection">
							<Link to={`/survey/${survey.surveyId}`}>
								<li className="collection-item">
									<div className="collection-item-name">{survey.surveyName}</div>
									<div className="collection-item-user">{survey.user}</div>
								</li>
							</Link>
						</ul>
					</div>
				);
			} else {
				return (
					<div key={survey.surveyId}>
						<ul className="collection">
							<Link to={`/survey/${survey.surveyId}`}>
								<li className="collection-item">
									<div className="collection-item-name">
										{survey.surveyName}
										<i className="material-icons right green-text">
											check_circle
										</i>
									</div>
									<div className="collection-item-user">{survey.user}</div>
								</li>
							</Link>
						</ul>
					</div>
				);
			}
		});
	}

	renderSurveyListNoAuth() {
		const MySwal = withReactContent(Swal);
		return this.props.surveys.map((survey, index) => {
			return (
				<div key={survey.surveyId}>
					<ul className="collection">
						<Link
							to="#"
							onClick={() =>
								MySwal.fire({
									title: <p>Login with Google</p>,
									text: "Please login to view surveys."
								})
							}
						>
							<li className="collection-item">
								<div>{survey.surveyName}</div>
								<div>{survey.user}</div>
							</li>
						</Link>
					</ul>
				</div>
			);
		});
	}

	render() {
		if (!this.props.auth) {
			return (
				<div className="landing container">
					<h3 className="landing-title center">Surveys</h3>
					{this.renderSurveyListNoAuth()}
				</div>
			);
		} else {
			return (
				<div className="landing container">
					<h3 className="landing-title center">Surveys</h3>
					{this.renderSurveyListAuth()}
				</div>
			);
		}
	}
}

function shuffle(a) {
	for (let i = a.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[a[i], a[j]] = [a[j], a[i]];
	}
	return a;
}

const mapStateToProps = state => {
	return {
		auth: state.auth,
		surveys: shuffle(state.surveys),
		mySurveys: state.myCompletedSurveys.map(id => {
			return id.surveyId;
		})
	};
};

export default connect(
	mapStateToProps,
	{ fetchAllSurveys, fetchSurvey, fetchMyCompletedSurveys }
)(Landing);
