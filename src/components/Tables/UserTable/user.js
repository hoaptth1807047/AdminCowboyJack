import React, { Component } from 'react';
import { compose } from 'recompose';
import { withAuthorization } from '../../Session';
import firebase from 'firebase';
import * as ROUTES from '../../../constants/routes';

class UserList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      users: [],
      key: ''
    };
  }

  componentDidMount() {
    this.setState({ loading: true });

    this.unsubscribe = this.props.firebase
      .users()
      .onSnapshot(snapshot => {
        let users = [];
        snapshot.forEach(doc =>
          users.push({ ...doc.data(), key: doc.id }),
        );
        this.setState({
          users,
          loading: false,
        });
      });
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  handleClick = key => {
    const deleteRef = this.props.firebase
      .users().doc(key);
    let users = [];
    if (users.filter(user => user.key === key)) {
      deleteRef.delete().then(() => {
        alert("User successfully deleted!");
        console.log("Document successfully deleted!");
        this.props.history.push(ROUTES.USER)
      }).catch((error) => {
        console.error("Error removing document: ", error);
      });
    }
  };

  render() {
    const { users } = this.state;

    return (
      <div className="wrapper">
        <div className="main-panel">
          <div className="content">
            <div className="container-fluid">
              <div className="row">
                <div className="col-md-12">
                  <div className="card card-plain">
                    <div className="card-header card-header-primary">
                      <h4 className="card-title mt-0"> Users </h4>
                      <p className="card-category"/>
                    </div>
                    <div className="card-body">
                      <div className="table-responsive">
                        <table className="table table-hover">
                          <thead className="">
                          <th/>
                          <th>UID</th>
                          <th>User Name</th>
                          <th>Email</th>
                          <th/>
                          </thead>
                          {users.map(user =>
                            <tbody>
                            <tr>
                              <td>
                                <div className="form-check">
                                  <label className="form-check-label">
                                    <input className="form-check-input" type="checkbox" value=""/>
                                    <span className="form-check-sign">
                                    <span className="check"/>
                                  </span>
                                  </label>
                                  </div>
                              </td>
                              <td>{user.key}</td>
                              <td>{user.username}</td>
                              <td>{user.email}</td>
                              <td className="td-actions text-right">
                                <button type="submit" onClick={() =>
                                { if (window.confirm('Are you sure you wish to delete "' + user.username + '" ?'))
                                  this.handleClick(user.key) }} rel="tooltip" title="Remove"
                                        className="btn btn-danger btn-link btn-sm">
                                  <i className="material-icons">close</i>
                                </button>
                              </td>
                            </tr>
                            </tbody>,
                          )}
                        </table>
                      </div>
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
      </div>
    );
  }
}

const condition = authUser => !!authUser;

export default compose(
  withAuthorization(condition),
)(UserList);

