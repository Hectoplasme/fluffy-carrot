import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

//Redux
import { compose } from "redux";
import { connect } from "react-redux";
import { firebaseConnect } from "react-redux-firebase";

//Components
import { Modal, ModalHeader, ModalBody } from "../layout/Modal";

class Login extends Component {
  state = {
    email: "",
    password: ""
  };

  onChange = e => this.setState({ [e.target.name]: e.target.value });

  onSubmit = e => {
    e.preventDefault();

    const { firebase } = this.props;
    const { email, password } = this.state;

    firebase
      .login({
        email,
        password
      })
      .catch(err => alert("Invalid Login Credentials"));
  };

  render() {
    const { email, password } = this.state;
    return (
      <form onSubmit={this.onSubmit}>
        <Modal thin>
          <ModalHeader>
            <i className="fas fa-cookie-bite text-purple text-2xl sm:text-4xl align-center mr-4" />
            <span className="text-2xl sm:text-4xl text-purple-darker align-center">
              Fluffy cookie
            </span>
          </ModalHeader>
          <ModalBody>
            <input
              type="email"
              name="email"
              autoComplete="username"
              value={email}
              onChange={this.onChange}
              placeholder="Email"
              className="w-full p-3 my-2 border border-grey-dark rounded"
            />
            <input
              type="password"
              name="password"
              autoComplete="current-password"
              value={password}
              onChange={this.onChange}
              placeholder="Mot de passe"
              className="w-full p-3 mb-4 mt-2 border border-grey-dark rounded"
            />

            <button className="btn btn--accent w-full">Se connecter</button>

            <div className="max-w-2xs mt-2 ml-auto text-right ">
              Vous n'êtes pas encore sur{" "}
              <span className="whitespace-no-wrap">Fluffy Cookie</span> ?{" "}
              <Link
                to="/register"
                className="no-underline text-purple font-bold hover:text-purple-dark"
              >
                Inscrivez-vous
              </Link>
            </div>

            {/* <div className="text-center py-8 text-xl font-bold">ou</div>
            <button className="btn btn--accent w-full bg-blue-darker mt-4">
              <i className="fab fa-facebook-f icon align-middle text-xl mr-3" />
              Se connecter avec facebook
            </button>

            <button className="btn btn--accent w-full bg-blue mt-4">
              <i className="fab fa-google icon align-middle text-xl mr-3" />
              Se connecter avec google
            </button> */}
          </ModalBody>
        </Modal>
      </form>
    );
  }
}

Login.propTypes = {
  firebase: PropTypes.object.isRequired
};

export default compose(
  firebaseConnect(),
  connect((state, props) => ({
    auth: state.firebase.auth
  }))
)(Login);
