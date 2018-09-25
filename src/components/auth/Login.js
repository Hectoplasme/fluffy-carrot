import React, { Component } from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
// import { Link } from "react-router-dom";

//Redux
import { firebaseConnect } from "react-redux-firebase";

//Components
import { Modal, ModalHeader, ModalBody } from "../layout/Modal";

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      errors: {}
    };
  }

  onChange = e => this.setState({ [e.target.name]: e.target.value });

  onSubmit = e => {
    e.preventDefault();

    const { firebase } = this.props;
    const { email, password } = this.state;

    //@todo Check for errors
    const errors = {};
    const regexp = RegExp(/^ *$/); //Test if the string is empty or contain only space
    const regexpEmail = RegExp(
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    ); //Test the format of the email adress

    if (regexp.test(email)) {
      errors.email = "Vous n'avez pas saisi votre email.";
    } else if (!regexpEmail.test(email)) {
      errors.email = "Cette adresse email est invalide.";
    }

    if (regexp.test(password)) {
      errors.password = "Vous n'avez pas saisi votre mot de passe.";
    }

    if (Object.keys(errors).length !== 0) {
      //Send errors to the state and display them
      this.setState({ errors: errors });
    } else {
      //Login

      firebase
        .login({
          email,
          password
        })
        .catch(err => {
          //Handle the connexion errors and display them
          console.log(err);
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
            <label htmlFor="email">
              Email{" "}
              <input
                type="text"
                name="email"
                value={email}
                onChange={this.onChange}
                className={classnames("w-full p-3 my-2 rounded", {
                  "border-grey-dark border": !errors.email,
                  "border-red border": errors.email
                })}
              />
              {errors.email && (
                <span className="block my-1 p-4 font-normal rounded bg-red-lightest border border-red italic text-sm">
                  {errors.email}
                </span>
              )}
            </label>
            <label htmlFor="password">
              Mot de passe{" "}
              <input
                type="password"
                name="password"
                value={password}
                onChange={this.onChange}
                className={classnames("w-full p-3 my-2 rounded", {
                  "border-grey-dark border": !errors.password,
                  "border-red border": errors.password
                })}
              />
              {errors.password && (
                <span className="block my-1 p-4 font-normal rounded bg-red-lightest border border-red italic text-sm">
                  {errors.password}
                </span>
              )}
            </label>
            {errors.error && (
              <span className="block my-1 p-4 font-normal rounded bg-red-lightest border border-red italic text-sm">
                {errors.error}
              </span>
            )}
            <input
              type="submit"
              value="Se connecter"
              className="mt-4 btn btn--accent w-full cursor-pointer"
            />
            <div className="text-xs mt-4 text-grey-darker leading-normal text-right">
              <div>
                Pour tester l'application, vous pouvez vous connecter avec les
                identifiants suivants:{" "}
              </div>
              <div>
                <span className="font-bold">Email : </span>
                test@test.fr <span className="font-bold">Mot de passe : </span>
                test123
              </div>
            </div>
          </ModalBody>
        </Modal>
      </form>
    );
  }
}

Login.propTypes = {
  firebase: PropTypes.object.isRequired
};

export default firebaseConnect()(Login);
