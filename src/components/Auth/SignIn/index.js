import React, { Component } from 'react';

import { compose } from 'recompose';
import { PasswordForgetLink } from '../PasswordForget';
import { withFirebase } from '../../Firebase';
import * as ROUTES from '../../../constants/routes';
import { withAuthorization } from '../../Session';
import {withRouter} from "react-router-dom";

const SignInPage = () => (
  <div>
    <SignInForm/>
  </div>
);

const INITIAL_STATE = {
  email: '',
  password: '',
  error: null,
};

class SignInFormBase extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = event => {
    const { email, password } = this.state;

    this.props.firebase
      .doSignInWithEmailAndPassword(email, password)
      .then(() => {
        this.setState({ ...INITIAL_STATE });
        this.props.history.push(ROUTES.HOME);
      })
      .catch(error => {
        this.setState({ error });
      });

    event.preventDefault();
  };

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const { email, password, error } = this.state;

    const isInvalid = password === '' || email === '';

    return (
      <div className="card container" style={{width: "35%"}}>
        <h5 className="card-header info-color white-text text-center py-4">
          <strong>Sign in</strong>
        </h5>
        <div className="card-body px-lg-5 pt-0">
          <form onSubmit={this.onSubmit} className="text-center" style={{ color: '#757575' }}>
            <div className="md-form">
              <input type="email"
                     id="materialLoginFormEmail"
                     className="form-control"
                     name="email"
                     value={email}
                     onChange={this.onChange}
                     />
              <label for="materialLoginFormEmail">E-mail</label>
            </div>
            <div className="md-form">
              <input type="password"
                     id="materialLoginFormPassword"
                     className="form-control"
                     name="password"
                     value={password}
                     onChange={this.onChange}
              />
              <label for="materialLoginFormPassword">Password</label>
            </div>

            <div className="d-flex justify-content-around">
              <div>
                <PasswordForgetLink/>
              </div>
            </div>
            <button disabled={isInvalid}
                    className="btn btn-outline-info btn-rounded btn-block my-4 waves-effect z-depth-0"
                    type="submit">Sign in
            </button>
            <div>
              {error && <p>{error.message}</p>}
            </div>
          </form>
        </div>
      </div>
    );
  }
}

const SignInForm = compose(
  withRouter,
  withFirebase,
)(SignInFormBase);
export { SignInForm };

// export default SignInPage;

export default compose(
  withAuthorization(authUser => !authUser),
)(SignInPage);

