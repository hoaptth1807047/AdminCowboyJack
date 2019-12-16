import React, { Component } from 'react';
import { compose } from 'recompose';
import { withAuthorization } from '../../Session';
import firebase from 'firebase';
import * as ROUTES from '../../../constants/routes';
import { Link } from 'react-router-dom';

class OrderTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      orders: [],
      key: '',
    };
  }

  componentDidMount() {
    this.setState({ loading: true });
    this.unsubscribe = firebase.firestore().collection('orders')
      .onSnapshot(snapshot => {
        let orders = [];
        snapshot.forEach(doc =>
          orders.push({ ...doc.data(), key: doc.id }),
        );
        this.setState({
          orders,
          loading: false,
        });
      });
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  handleClick = key => {
    const deleteRef = firebase.firestore().collection('orders').doc(key);
    let orders = [];
    if (orders.filter(order => order.key === key)){
      deleteRef.get().then( doc => {
        const order = doc.data();
        deleteRef.set({
          total: order.total,
          status: 'Deleted'
        }).then(() => {
          alert('Order successfully deleted!');
          console.log('Document successfully deleted!');
          this.props.history.push(ROUTES.ORDER_TABLE);
        });
      })
    }
    // if (orders.filter(order => order.key === key)) {
    //   deleteRef.delete().then(() => {
    //     alert("Order successfully deleted!");
    //     console.log("Document successfully deleted!");
    //     this.props.history.push(ROUTES.ORDER_TABLE)
    //   }).catch((error) => {
    //     console.error("Error removing document: ", error);
    //   });
    // }
    // if (orders.filter(order => order.key === key)) {
    //   deleteRef.set({
    //     status: 'deleted',
    //   }).then(() => {
    //     alert('Order successfully deleted!');
    //     console.log('Document successfully deleted!');
    //     this.props.history.push(ROUTES.ORDER_TABLE);
    //   });
    // }
  };

  render() {
    const { orders } = this.state;
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
                          <th>Total</th>
                          <th>Status</th>
                          <th/>
                          </thead>
                          {orders.map(order =>
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
                              <td>{order.key}</td>
                              <td>{order.total}</td>
                              <td>{order.status}</td>
                              <td className="td-actions text-right">
                                <button type="button" rel="tooltip" title="Detail"
                                        className="btn btn-primary btn-link btn-sm">
                                  <i className="material-icons">description</i>
                                </button>
                                <button type="submit" onClick={() => {
                                  if (window.confirm('Are you sure you wish to delete "' + order.key + '" ?'))
                                    this.handleClick(order.key);
                                }} rel="tooltip" title="Remove"
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
)(OrderTable);

