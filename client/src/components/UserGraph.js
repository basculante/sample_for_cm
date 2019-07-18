import React from "react";
import { connect } from "react-redux";
import { fetchCompletedUserSurvey } from "../actions";
import {
	XYPlot,
	XAxis,
	YAxis,
	VerticalGridLines,
	HorizontalGridLines,
	VerticalBarSeries,
	RadialChart
} from "react-vis";
import "./Graph.css";

class UserGraph extends React.Component {
	componentDidMount() {
		const surveyId = this.props.surveyId;
		const userId = this.props.userId;
		this.props.fetchCompletedUserSurvey(surveyId, userId);
	}

	barGraphData() {
		const array = this.props.graph;
		var A, B, C, D;
		A = array.reduce(function(n, val) {
			return n + (val === "A");
		}, 0);
		B = array.reduce(function(n, val) {
			return n + (val === "B");
		}, 0);
		C = array.reduce(function(n, val) {
			return n + (val === "C");
		}, 0);
		D = array.reduce(function(n, val) {
			return n + (val === "D");
		}, 0);
		return [
			{ x: "A", y: A },
			{ x: "B", y: B },
			{ x: "C", y: C },
			{ x: "D", y: D }
		];
	}

	radialGraphData() {
		const array = this.props.graph;
		var A, B, C, D;
		A = array.reduce(function(n, val) {
			return n + (val === "A");
		}, 0);
		B = array.reduce(function(n, val) {
			return n + (val === "B");
		}, 0);
		C = array.reduce(function(n, val) {
			return n + (val === "C");
		}, 0);
		D = array.reduce(function(n, val) {
			return n + (val === "D");
		}, 0);
		return [
			{ label: "A", angle: A },
			{ label: "B", angle: B },
			{ label: "C", angle: C },
			{ label: "D", angle: D }
		];
	}

	renderTableData() {
		return (
			<table>
				<thead>
					<tr>
						<th>Question</th>
						<th>Answer</th>
					</tr>
				</thead>
				<tbody>
				<tr>
				<td>
					{this.props.questions.map((question, index) => {
						return (
							<p key={index}>
								{question.substring(1)}
							</p>
						);
					})}
				</td>
				<td>
					{this.props.answers.map((answer, index) => {
						return (
							<p key={index}>
								{answer}
							</p>
						);
					})}
				</td>
				</tr>
				</tbody>
			</table>
		);
	}

	render() {
		const { title } = this.props.location.state
		return (
			<div className="graph-page container">
				<h3 className="graph-title">{title}</h3>
				<div className="graphs row">
					<div className="col s12 m12 l6">
						<XYPlot
							xType="ordinal"
							width={300}
							height={300}
							xDistance={100}
							className="bar-chart"
						>
							<VerticalGridLines />
							<HorizontalGridLines />
							<XAxis />
							<YAxis />
							<VerticalBarSeries data={this.barGraphData()} />
						</XYPlot>
					</div>
					<div className="col s12 m12 l6">
						<RadialChart
							className="radial-chart"
							data={this.radialGraphData()}
							width={300}
							height={300}
							showLabels={true}
						/>
					</div>
					<div>{this.renderTableData()}</div>
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state, ownProps) => {
	return {
		surveyId: ownProps.match.params.id,
		userId: ownProps.match.params.user,
		survey: state.userCompletedSurvey,
		graph: state.userCompletedSurvey
			.map((survey, index) => {
				return survey.answers
					.map((answers, key) => {
						const ans = Object.values(answers);
						return ans;
					})
					.flat();
			})
			.flat(),
		questions: state.userCompletedSurvey
			.map((survey, index) => {
				return survey.answers
					.map((answers, key) => {
						return Object.keys(answers);
					})
					.flat();
			})
			.flat(),
		answers: state.userCompletedSurvey
			.map((survey, index) => {
				return survey.answers
					.map((answers, key) => {
						return Object.values(answers);
					})
					.flat();
			})
			.flat()
	};
};

export default connect(
	mapStateToProps,
	{ fetchCompletedUserSurvey }
)(UserGraph);
