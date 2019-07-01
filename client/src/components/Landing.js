import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { fetchAllSurveys, fetchSurvey } from "../actions";
import "./Landing.css";

class Landing extends React.Component {
	componentDidMount() {
		this.props.fetchAllSurveys();
		this.props.fetchSurvey();
	}

	renderSurveyList() {
		return this.props.surveys.map((survey, index) => {
			return (
				<div key={survey.surveyId}>
					<ul className="collection">
						<Link to={`/survey/${survey.surveyId}`}>
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
		return (
			<div className="landing container">
				<h3>Surveys</h3>
				{this.renderSurveyList()}
			</div>
		);
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
		surveys: shuffle(state.surveys)
	};
};

export default connect(
	mapStateToProps,
	{ fetchAllSurveys, fetchSurvey }
)(Landing);
