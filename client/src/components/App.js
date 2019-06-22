import React from "react";
import { Router, Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { fetchUser } from "../actions";
import history from "../history";
import "./index.css";

import Header from "./Header";
import Landing from "./Landing";
import Dashboard from "./Dashboard";
import Survey from "./Survey";
import Graph from "./Graph";
import SurveyForm from "./SurveyForm";

class App extends React.Component {
	componentDidMount() {
		this.props.fetchUser();
	}

	render() {
		return (
			<div className="app_page">
				<Router history={history}>
					<div>
						<Header />
						<Route path="/" component={Landing} exact />
						<Route path="/dashboard" component={Dashboard} exact />
						<Route path="/survey1" component={Survey} exact />
						<Route path="/graph" component={Graph} exact />
						<Route path="/surveyform" component={SurveyForm} exact />
					</div>
				</Router>
			</div>
		)
	}
}

const mapStateToProps = state => {
	return {
		auth: state.auth
	};
};

export default connect(
	mapStateToProps,
	{ fetchUser }
)(App);
