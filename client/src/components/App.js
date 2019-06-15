import React from "react";
import { Router, Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { fetchUser } from "../actions";
import history from "../history";

class App extends React.Component {
	componentDidMount() {
		this.props.fetchUser();
	}

	render() {
		return (
			<div className="app_page">
				<Router history={history}>
					<div>
						hey!
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
