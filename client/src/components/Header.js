import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import "./Header.css";
import M from "materialize-css";

class Header extends Component {
  componentDidMount() {
    document.addEventListener("DOMContentLoaded", function() {
      var elems = document.querySelectorAll(".sidenav");
      M.Sidenav.init(elems);
    });
  }

  renderContent() {
    switch (this.props.auth) {
      case null:
        return;
      case false:
        return (
          <div>
            <li>
              <a
                href="/auth/google"
                className="nav-item right right hide-on-med-and-down"
              >
                Login With Google
              </a>
            </li>
          </div>
        );
      default:
        return [
          <li key="1">
            <a
              href="/api/logout"
              className="nav-item right right hide-on-med-and-down"
            >
              Logout
            </a>
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
            <Link
              to={`/dashboard/${this.props.auth._id}`}
              className="nav-item right right hide-on-med-and-down"
            >
              Dashboard
            </Link>
          </div>
        ];
    }
  }

  sideNavContent() {
    switch (this.props.auth) {
      case null:
        return;
      case false:
        return (
          <div>
            <li>
              <a href="/auth/google" className="sidenav-close">
                <i className="material-icons">account_circle</i>Login With
                Google
              </a>
            </li>
          </div>
        );
      default:
        return [
          <div key="1">
            <li>
              <a href="/api/logout" className="sidenav-close">
                <i className="material-icons">account_circle</i>Logout
              </a>
            </li>
            <li>
              <div className="divider" />
            </li>
            <li>
              <Link to="/" className="sidenav-close">
                <i className="material-icons">home</i>Home
              </Link>
            </li>
            <li>
              <Link to="/createsurvey" className="sidenav-close">
                <i className="material-icons">list</i>Surveys
              </Link>
            </li>
            <li>
              <Link
                to={`/dashboard/${this.props.auth._id}`}
                className="sidenav-close"
              >
                <i className="material-icons">apps</i>Dashboard
              </Link>
            </li>
            <li>
              <Link to="/createsurvey" className="sidenav-close">
                <i className="material-icons">control_point</i>New Survey
              </Link>
            </li>
          </div>
        ];
    }
  }

  render() {
    return (
      <nav>
        <div className="nav-wrapper white row">
          <a href="##" data-target="mobile-demo" className="sidenav-trigger">
            <i className="material-icons black-text">menu</i>
          </a>
          <ul id="nav-mobile" className="right right">
            {this.renderContent()}
          </ul>
          <ul className="user-buttons left">
            <li>
              <Link
                to="/"
                className="nav-item right right hide-on-med-and-down"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/surveys"
                className="nav-item right right hide-on-med-and-down"
              >
                Surveys
              </Link>
            </li>
            <li>{this.renderUserContent()}</li>
            <li>
              <Link to="/" className="brand-logo center">
                <img
                  src={require("./images/logo.png")}
                  className="surveysoup-logo"
                  alt="logo"
                />
              </Link>
            </li>
          </ul>
        </div>
        <ul className="sidenav" id="mobile-demo">
          {this.sideNavContent()}
        </ul>
      </nav>
    );
  }
}

function mapStateToProps({ auth }) {
  return { auth };
}

export default connect(mapStateToProps)(Header);
