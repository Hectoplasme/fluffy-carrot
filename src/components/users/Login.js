import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import classnames from "classnames";

//Redux
import { compose } from "redux";
import { connect } from "react-redux";
import { firebaseConnect } from "react-redux-firebase";

//Components
import { Modal, ModalHeader, ModalBody } from "../layout/Modal";

class Login extends Component {
  state = {
    email: "",
    password: "",
    errors: {}
  };

  onChange = e => this.setState({ [e.target.name]: e.target.value });

  onSubmit = e => {
    e.preventDefault();

    const { firebase } = this.props;
    const { email, password } = this.state;

    //Check for error
    const errors = {};
    const regexp = RegExp(/^ *$/); //Test if the string is empty or contain only space
    const regexpEmail = RegExp(
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );

    if (regexp.test(email)) {
      errors.email = "Vous n'avez pas saisi votre email.";
    } else if (!regexpEmail.test(email)) {
      errors.email = "Cette adresse email est invalide.";
    }

    if (regexp.test(password)) {
      errors.password = "Vous n'avez pas saisi votre mot de passe.";
    }

    if (Object.keys(errors).length !== 0) {
      this.setState({ errors: errors });
    } else {
      firebase
        .login({
          email,
          password
        })
        .catch(err => {
          if (err.code === "auth/user-not-found") {
            this.setState({
              errors: { email: "Cet utilisateur n'existe pas." }
            });
          } else if (err.code === "auth/wrong-password") {
            this.setState({
              errors: { password: "Ce mot de passe est invalide." }
            });
          } else {
            this.setState({
              errors: {
                error:
                  "Oups, il y a eu un problème. Veuillez réessayer plus tard."
              }
            });
          }
        });
    }
  };

  render() {
    const { email, password, errors } = this.state;

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
              type="text"
              name="email"
              autoComplete="username"
              value={email}
              onChange={this.onChange}
              placeholder="Email"
              className={classnames("w-full p-3 my-2 rounded", {
                "border-grey-dark border": !errors.email,
                "border-red border-2": errors.email
              })}
            />
            {errors.email && (
              <div className="mb-2 text-red text-sm italic">{errors.email}</div>
            )}
            <input
              type="password"
              name="password"
              autoComplete="current-password"
              value={password}
              onChange={this.onChange}
              placeholder="Mot de passe"
              className={classnames("w-full p-3 my-2 rounded", {
                "border-grey-dark border": !errors.password,
                "border-red border-2": errors.password
              })}
            />
            {errors.password && (
              <div className="mb-2 text-red text-sm italic">
                {errors.password}
              </div>
            )}

            {errors.error && (
              <div className="border-red border bg-red-lightest rounded text-sm text-red italic p-4 mt-2">
                {errors.error}
              </div>
            )}

            <button className="mt-4 btn btn--accent w-full">
              Se connecter
            </button>

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
  firebase: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

export default compose(
  firebaseConnect(),
  connect((state, props) => ({
    auth: state.firebase.auth
  }))
)(Login);
