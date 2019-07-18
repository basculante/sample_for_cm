import React from "react";
import { Router, Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { fetchUser } from "../actions";
import history from "../history";
import "./index.css";

import Header from "./Header";
import Intro from "./Intro";
import Landing from "./Landing";
import Dashboard from "./Dashboard";
import Survey from "./Survey";
import SurveyForm from "./SurveyForm";
import Graph from "./Graph";
import UserGraph from "./UserGraph";

class App extends React.Component {
	componentDidMount() {
		this.props.fetchUser();
	}

	render() {
		const PrivateRoute = ({ component: Component, ...rest }) => (
			<Route
				{...rest}
				render={props =>
					!this.props.auth ? <Redirect to="/" /> : <Component {...props} />
				}
			/>
		);
		return (
			<div className="app_page">
				<Router history={history}>
					<div>
						<Header />
						<Route path="/" component={Intro} exact />
						<Route path="/surveys" component={Landing} exact />
						<PrivateRoute path="/dashboard/:id" component={Dashboard} exact />
						<Route path="/survey/:id" component={Survey} exact />
						<PrivateRoute path="/createsurvey" component={SurveyForm} exact />
						<PrivateRoute path="/graph/:id" component={Graph} exact />
						<PrivateRoute path="/usergraph/:id/:user" component={UserGraph} exact />
					</div>
				</Router>
			</div>
		);
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
