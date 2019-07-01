import React from "react";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
import { fetchSurvey, completeSurvey } from "../actions";

class Survey extends React.Component {
  componentDidMount() {
    const surveyId = this.props.surveyId;
    this.props.fetchSurvey(surveyId);
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

  renderInput = ({ input, label, group, letter, meta }) => {
    const className = `field ${meta.error && meta.touched ? "red-text" : ""}`;
    return (
      <div className={className}>
        <label>
          <input
            {...input}
            autoComplete="off"
            type="radio"
            className="with-gap"
            name={group}
            value={letter}
          />
          <span>{label}</span>
        </label>
        {this.renderError(meta)}
      </div>
    );
  };

  numToStr(n) {
    const char = String.fromCharCode(65 + n);
    return char;
  }

  renderQuestion = ({ fields }) => {
    return this.props.survey.map((question, index) => {
      return (
        <div className="row" key={index}>
          <div className="question col s12">{question.question}</div>
          <div className="answer col s12">
            {question.answers.map((answer, key) => {
              return (
                <div key={key}>
                  <Field
                    name={"_" + question.question}
                    component={this.renderInput}
                    label={answer}
                    group={index}
                    letter={this.numToStr(key)}
                  />
                </div>
              );
            })}
          </div>
        </div>
      );
    });
  };

  onSubmit = formValues => {
    const user = this.props.auth.displayName;
    const surveyId = this.props.surveyId;
    const surveyName = this.props.surveyName;
    this.props.completeSurvey(user, surveyId, surveyName, formValues);
  };

  render() {
    if (!this.props.survey) {
      return <div>Loading</div>;
    } else {
      return (
        <div className="survey-form container">
          <form onSubmit={this.props.handleSubmit(this.onSubmit)}>
            <Field component={this.renderQuestion} name="answers" />
            <button className="waves-effect waves-light btn" type="submit">
              Submit
            </button>
          </form>
        </div>
      );
    }
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    surveyId: ownProps.match.params.id,
    survey: state.survey.questionSet,
    auth: state.auth,
    surveyName: state.survey.surveyName
  };
};

const formWrapped = reduxForm({
  form: "surveyForm",
  touchOnBlur: false
})(Survey);

export default connect(
  mapStateToProps,
  { fetchSurvey, completeSurvey }
)(formWrapped);
