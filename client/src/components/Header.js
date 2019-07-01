import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import "./Header.css";

class Header extends Component {
  renderContent() {
    switch (this.props.auth) {
      case null:
        return;
      case false:
        return (
          <div>
            <li>
              <a href="/auth/google">Login With Google</a>
            </li>
          </div>
        );
      default:
        return [
          <li key="1">
            <a href="/api/logout">Logout</a>
          </li>
        ];
    }
  }

  renderUserContent() {
    switch (this.props.auth) {
      case null:
        return;
      case false:
        return;
      default:
        return [
          <div key="1">
            <Link to={`/dashboard/${this.props.auth._id}`}>Dashboard</Link>
          </div>
        ];
    }
  }
  render() {
    return (
      <nav className="blue-grey">
        <div className="nav-wrapper row">
          <ul id="nav-mobile" className="right right">
            {this.renderContent()}
          </ul>
          <ul className="user-buttons left">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>{this.renderUserContent()}</li>
          </ul>
        </div>
      </nav>
    );
  }
}

function mapStateToProps({ auth }) {
  return { auth };
}

export default connect(mapStateToProps)(Header);
