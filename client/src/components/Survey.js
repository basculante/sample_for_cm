import React from "react";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
import { fetchSurvey, addSurvey } from "../actions";
import "./Survey.css";

class SurveyForm extends React.Component {
	componentDidMount() {
		this.props.fetchSurvey();
	}

	renderError({ error, touched }) {
		if (touched && error) {
			return (
				<div className="red-text">
					<div className="header">{error}</div>
				</div>
			);
		}
	}

	renderInput = ({ input, label, meta }) => {
		const className = `field ${meta.error && meta.touched ? "red-text" : ""}`;
		return (
			<div className={className}>
				<label>{label}</label>
				<input {...input} autoComplete="off" />
				{this.renderError(meta)}
			</div>
		);
	};

	renderAnswer = ({
		input,
		label,
		meta,
		number,
		group,
		answerA,
		answerB,
		answerC,
		answerD
	}) => {
		const className = `field ${meta.error && meta.touched ? "red-text" : ""}`;
		return (
			<div className={className}>
				<div>
					<label>
						<input
							{...input}
							className="with-gap"
							name={`group${number}`}
							type="radio"
							value="A"
						/>
						<span>{answerA}</span>
					</label>
				</div>
				<div>
					<label>
						<input
							{...input}
							className="with-gap"
							name={`group${number}`}
							type="radio"
							value="B"
						/>
						<span>{answerB}</span>
					</label>
				</div>
				<div>
					<label>
						<input
							{...input}
							className="with-gap"
							name={`group${number}`}
							type="radio"
							value="C"
						/>
						<span>{answerC}</span>
					</label>
				</div>
				<div>
					<label>
						<input
							{...input}
							className="with-gap"
							name={`group${number}`}
							type="radio"
							value="D"
						/>
						<span>{answerD}</span>
					</label>
				</div>
			</div>
		);
	};

	renderQuestion() {
		return this.props.survey.map((question, index) => {
			return (
				<div className="row" key={index}>
					<div className="question col s12">{question.Question}</div>
					<div className="answer col s12">
						<Field
							name={`question${question.Number}`}
							component={this.renderAnswer}
							answerA={question.A}
							answerB={question.B}
							answerC={question.C}
							answerD={question.D}
							group={`group + ${index}`}
							number={question.Number}
						/>
					</div>
				</div>
			);
		});
	}

	onSubmit = formValues => {
		const {
			question1,
			question2,
			question3,
			question4,
			question5
		} = formValues;
		const surveyId = "1";
		this.props.addSurvey(
			question1,
			question2,
			question3,
			question4,
			question5,
			surveyId
		);
	};

	render() {
		if (!this.props.survey) {
			return <div>Loading</div>;
		} else {
			return (
				<div className="survey-form container">
					<form
						onSubmit={this.props.handleSubmit(this.onSubmit)}
						className="form-field"
					>
						{this.renderQuestion()}
						<button className="submit-button teal btn-flat white-text left">
							submit
						</button>
					</form>
				</div>
			);
		}
	}
}

const validate = formValues => {
	const errors = {};

	// if (!group1 || !group2 || !group3 || !group4 || !group5) {
	// 	errors.radioError = 'Please select an answer.';
	// 	}

	return errors;
};

const mapStateToProps = (state, ownProps) => {
	return {
		auth: state.auth,
		survey: state.survey.survey1
	};
};

const formWrapped = reduxForm({
	form: "surveyForm",
	touchOnBlur: false,
	validate
})(SurveyForm);

export default connect(
	mapStateToProps,
	{ fetchSurvey, addSurvey }
)(formWrapped);
