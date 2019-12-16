import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';

import { withFirebase } from '../../Firebase';
import * as ROUTES from '../../../constants/routes';
import * as ROLES from '../../../constants/roles';
import { PasswordForgetLink } from '../PasswordForget';

const SignUpPage = () => (
  <div>
    <SignUpForm/>
  </div>
);

const INITIAL_STATE = {
  username: '',
  email: '',
  passwordOne: '',
  passwordTwo: '',
  error: null,
};

const ERROR_CODE_ACCOUNT_EXISTS = 'auth/email-already-in-use';

const ERROR_MSG_ACCOUNT_EXISTS = `
  An account with this E-Mail address already exists.
  Try to login with this account instead. If you think the
  account is already used from one of the social logins, try
  to sign in with one of them. Afterward, associate your accounts
  on your personal account page.
`;

class SignUpFormBase extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = event => {
    const { username, email, passwordOne } = this.state;
    this.props.firebase
      .doCreateUserWithEmailAndPassword(email, passwordOne)
      .then(authUser => {
        // Create a user in your Firebase realtime database
        return this.props.firebase.user(authUser.user.uid).set(
          {
            username,
            email,
          },
          { merge: true },
        );
      })
      .then(() => {
        return this.props.firebase.doSendEmailVerification();
      })
      .then(() => {
        this.setState({ ...INITIAL_STATE });
        this.props.history.push(ROUTES.HOME);
      })
      .catch(error => {
        if (error.code === ERROR_CODE_ACCOUNT_EXISTS) {
          error.message = ERROR_MSG_ACCOUNT_EXISTS;
        }

        this.setState({ error });
      });

    event.preventDefault();
  };

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  onChangeCheckbox = event => {
    this.setState({ [event.target.name]: event.target.checked });
  };

  render() {
    const {
      username,
      email,
      passwordOne,
      passwordTwo,
      error,
    } = this.state;

    const isInvalid =
      passwordOne !== passwordTwo ||
      passwordOne === '' ||
      email === '' ||
      username === '';

    return (
      <div className="card container" style={{ width: '35%' }}>
        <h5 className="card-header info-color white-text text-center py-4">
          <strong>Sign up</strong>
        </h5>
        <div className="card-body px-lg-5 pt-0">
          <form onSubmit={this.onSubmit} className="text-center" style={{ color: '#757575' }}>
            <div className="md-form">
              <input type="text"
                     id="materialLoginFormFullName"
                     className="form-control"
                     name="username"
                     value={username}
                     onChange={this.onChange}
              />
              <label htmlFor="materialLoginFormFullName">Full Name</label>
            </div>
            <div className="md-form">
              <input type="email"
                     id="materialLoginFormEmail"
                     className="form-control"
                     name="email"
                     value={email}
                     onChange={this.onChange}
              />
              <label htmlFor="materialLoginFormEmail">E-mail</label>
            </div>
            <div className="md-form">
              <input type="password"
                     id="materialLoginFormPassword"
                     className="form-control"
                     name="passwordOne"
                     value={passwordOne}
                     onChange={this.onChange}
              />
              <label htmlFor="materialLoginFormPassword">Password</label>
            </div>
            <div className="md-form">
              <input type="password"
                     id="materialLoginFormPassword"
                     className="form-control"
                     name="passwordTwo"
                     value={passwordTwo}
                     onChange={this.onChange}
              />
              <label htmlFor="materialLoginFormPassword">Confirm Password</label>
            </div>
            <button disabled={isInvalid}
                    className="btn btn-outline-info btn-rounded btn-block my-4 waves-effect z-depth-0"
                    type="submit">Sign up
            </button>
              <Link to={ROUTES.SIGN_IN} className="btn btn-outline-info btn-rounded btn-block my-4 waves-effect z-depth-0">SIGN IN</Link>
            <div>
              {error && <p>{error.message}</p>}
            </div>
          </form>
        </div>
      </div>
    );
  }
}

const SignUpLink = () => (
  <p>
    Don't have an account? <Link to={ROUTES.SIGN_UP}>Sign Up</Link>
  </p>
);

const SignUpForm = withRouter(withFirebase(SignUpFormBase));

export default SignUpPage;

export { SignUpForm, SignUpLink };
