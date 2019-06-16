import React from "react";
import { connect } from "react-redux";
import { fetchSurveyData } from "../actions";
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

class Graph extends React.Component {
	componentDidMount() {
		this.props.fetchSurveyData();
	}

	renderTable() {
		return this.props.table.map((table, index) => {
			return (
				<table key={index}>
					<thead>
						<tr>
							<th>Question</th>
							<th>Answer</th>
						</tr>
					</thead>

					<tbody>
						<tr>
							<td>1</td>
							<td>{table.question1}</td>
						</tr>
						<tr>
							<td>2</td>
							<td>{table.question2}</td>
						</tr>
						<tr>
							<td>3</td>
							<td>{table.question3}</td>
						</tr>
						<tr>
							<td>4</td>
							<td>{table.question4}</td>
						</tr>
						<tr>
							<td>5</td>
							<td>{table.question5}</td>
						</tr>
					</tbody>
				</table>
			);
		});
	}

	render() {
		const graphData =
			!this.props.survey || !this.props.survey.length
				? [{ x: 0, y: 0 }]
				: this.props.survey[0];
		const radialData =
			!this.props.radial || !this.props.radial.length
				? [{ angle: 0 }]
				: this.props.radial[0];

		return (
			<div className="graph-page container">
				<h3 className="graph-title">Survey</h3>
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
							<VerticalBarSeries data={graphData} />
						</XYPlot>
					</div>
					<div className="col s12 m12 l6">
						<RadialChart
							className="radial-chart"
							data={radialData}
							width={300}
							height={300}
							showLabels={true}
						/>
					</div>
				</div>
				<div className="row">{this.renderTable()}</div>
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		survey: state.surveyData.map(answer => {
			const array = [
				answer.question1,
				answer.question2,
				answer.question3,
				answer.question4,
				answer.question5
			];
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
		}),
		radial: state.surveyData.map(answer => {
			const array = [
				answer.question1,
				answer.question2,
				answer.question3,
				answer.question4,
				answer.question5
			];
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
		}),
		table: state.surveyData
	};
};

export default connect(
	mapStateToProps,
	{ fetchSurveyData }
)(Graph);
