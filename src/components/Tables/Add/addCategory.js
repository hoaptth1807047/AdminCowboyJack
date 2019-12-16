import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';

import { withFirebase } from '../../Firebase';
import * as ROUTES from '../../../constants/routes';
import * as ROLES from '../../../constants/roles';
import { PasswordForgetLink } from '../../Auth/PasswordForget';
import { compose } from 'recompose';
import { withAuthorization } from '../../Session';
import firebase from 'firebase';

const AddCategoryPage = () => (
  <div>
    <CategoryForm/>
  </div>
);

const INITIAL_STATE = {
  name: '',
};

const ERROR_CODE_ACCOUNT_EXISTS = 'auth/email-already-in-use';

const ERROR_MSG_ACCOUNT_EXISTS = `
  An account with this E-Mail address already exists.
  Try to login with this account instead. If you think the
  account is already used from one of the social logins, try
  to sign in with one of them. Afterward, associate your accounts
  on your personal account page.
`;

class CategoryFormBase extends Component {
  constructor(props) {
    super(props);
    this.ref = firebase.firestore().collection('categories');
    this.state = { ...INITIAL_STATE };
  }

  onChange = (e) => {
    const state = this.state;
    state[e.target.name] = e.target.value;
    this.setState(state);
  };

  onSubmit = event => {
    const { name } = this.state;
    this.ref.add({
      name
    }).then(() => {
      this.setState({ ...INITIAL_STATE });
      alert("Added successfully!");
      this.props.history.push(ROUTES.HOME);
    }).catch((err) => {
      console.log(err);
    });

    event.preventDefault();
  };

  render() {
    const {
      name,
      error,
    } = this.state;

    const isInvalid =
      name === '';

    return (
      <div className="main-panel">
        <div className="content">
          <div className="container-fluid">
            <div className="row">
              <div className="col-md-8 container">
                <div className="card">
                  <div className="card-header card-header-primary">
                    <h4 className="card-title">Add Category</h4>
                    <p className="card-category"/>
                  </div>
                  <div className="card-body">
                    <form onSubmit={this.onSubmit}>
                      <div className="row">
                        <div className="col-md-12">
                          <div className="form-group">
                            <label className="bmd-label-floating">Name</label>
                            <input type="text" name="name" value={name}
                                   onChange={this.onChange} className="form-control"/>
                          </div>
                        </div>
                      </div>
                      <button disabled={isInvalid} type="submit" className="btn btn-primary pull-right">Add</button>
                      <div className="clearfix"/>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <footer className="footer">
          <div className="container-fluid">
            <nav className="float-left">
            </nav>
            <div className="copyright float-right">
              &copy;
              <script>
                document.write(new Date().getFullYear())
              </script>
              , made with <i className="material-icons">favorite</i> by
              <a href="#" target="_blank"/> for a better web.
            </div>
          </div>
        </footer>
      </div>
    );
  }
}

const CategoryForm = withRouter(withFirebase(CategoryFormBase));

export { CategoryForm };
const condition = authUser => !!authUser;

export default compose(
  withAuthorization(condition),
)(AddCategoryPage);
