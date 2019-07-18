import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { fetchCompletedSurveys } from "../actions";
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
		this.props.fetchCompletedSurveys(this.props.surveyId);
	}

	barGraphData() {
		const array = this.props.barGraph;
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
		const array = this.props.barGraph;
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
						<th>Participants</th>
					</tr>
				</thead>
				{this.props.surveys.map((survey, index) => {
					return (
						<tbody key={survey.user}>
							<tr>
								<td>
									<Link to={{
										pathname: `/usergraph/${survey.surveyId}/${survey._user}`,
										state:{
											title: this.props.location.state.title
										}
									}}>
										{survey.user}
									</Link>
								</td>
							</tr>
						</tbody>
					);
				})}
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
		barGraph: state.completedSurveys
			.map((survey, index) => {
				return survey.answers
					.map((answers, key) => {
						const ans = Object.values(answers);
						return ans;
					})
					.flat();
			})
			.flat(),
		surveys: state.completedSurveys
	};
};

export default connect(
	mapStateToProps,
	{ fetchCompletedSurveys }
)(Graph);
