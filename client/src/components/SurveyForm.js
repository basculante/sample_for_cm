import React from "react";
import { Field, FieldArray, reduxForm } from "redux-form";
import validate from "./validate";

class SurveyForm extends React.Component {
	renderField = ({ input, label, type, meta: { touched, error } }) => (
		<div>
			<div className="input-field">
				<input {...input} type={type} />
				{touched && error && <span>{error}</span>}
				<label>{label}</label>
			</div>
		</div>
	);

	renderAnswers = ({ fields, meta: { error } }) => (
		<ul>
			<li>
				<button
					className="waves-effect waves-light btn"
					type="button"
					onClick={() => fields.push()}
				>
					<i className="material-icons left">add_box</i>
					Add Answer
				</button>
			</li>
			{fields.map((answer, index) => (
				<li key={index}>
					<button
						className="waves-effect waves-light btn red right"
						type="button"
						title="Remove Answer"
						onClick={() => fields.remove(index)}
					>
						<i className="material-icons">delete</i>
					</button>
					<Field
						name={answer}
						type="text"
						component={this.renderField}
						label={`Answer #${index + 1}`}
					/>
				</li>
			))}
			{error && <li className="error">{error}</li>}
		</ul>
	);

	renderQuestions = ({ fields, meta: { error, submitFailed } }) => (
		<ul>
			<li>
				<button
					className="waves-effect waves-light btn"
					type="button"
					onClick={() => fields.push({})}
				>
					<i className="material-icons left">add_box</i>
					Add Question
				</button>
				<div>{submitFailed && error && <span>{error}</span>}</div>
			</li>
			{fields.map((answer, index) => (
				<li key={index}>
					<button
						className="waves-effect waves-light btn red right"
						type="button"
						title="Remove Answer"
						onClick={() => fields.remove(index)}
					>
						<i className="material-icons">delete_sweep</i>
					</button>
					<h4>Question #{index + 1}</h4>
					<Field
						name={`${answer}.question`}
						type="text"
						component={this.renderField}
						label="Question"
					/>
					<FieldArray
						name={`${answer}.questions`}
						component={this.renderAnswers}
					/>
				</li>
			))}
		</ul>
	);

	onSubmit = () => {};

	render() {
		const { handleSubmit, pristine, reset, submitting } = this.props;
		return (
			<div className="container">
				<form onSubmit={this.props.handleSubmit(this.onSubmit)}>
					<Field
						name="surveyName"
						type="text"
						component={this.renderField}
						label="Survey Name"
					/>
					<FieldArray name="questions" component={this.renderQuestions} />
					<div>
						<button
							className="waves-effect waves-light btn"
							type="submit"
							disabled={submitting}
						>
							Submit
						</button>
						<button
							className="waves-effect waves-light btn red right"
							type="button"
							disabled={pristine || submitting}
							onClick={reset}
						>
							Clear Values
						</button>
					</div>
				</form>
			</div>
		);
	}
}

export default reduxForm({
	form: "fieldArrays",
	touchOnBlur: false,
	validate
})(SurveyForm);
