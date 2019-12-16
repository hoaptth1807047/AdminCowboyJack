import React, { Component } from 'react';
import firebase from 'firebase';
import { Link } from 'react-router-dom';
import { compose } from 'recompose';
import { withAuthorization, AuthUserContext } from '../../Session';
import 'firebase/auth';
import * as ROLES from '../../../constants/roles';
import * as ROUTES from '../../../constants/routes';


class TablePizza extends Component {
  constructor(props) {
    super(props);
    this.ref = firebase.firestore().collection('products').where('category', '==', 'Pizza');
    this.unsubscribe = null;
    this.state = {
      products: [],
      key: '',
    };
  }

  onCollection = (querySnapshot) => {
    const products = [];
    querySnapshot.forEach((doc) => {
      const { name, title, price, url, category } = doc.data();
      products.push({
        key: doc.id,
        doc,
        name,
        title,
        price,
        url,
        category,
      });
    });
    this.setState({
      products,
    });
  };

  componentDidMount() {
    this.unsubscribe = this.ref.onSnapshot(this.onCollection);
  }

  handleClick = key => {
    const deleteRef = firebase.firestore().collection('products').doc(key);
    let products = [];
    if (products.filter(product => product.key === key)) {
      deleteRef.delete().then(() => {
        alert("Product successfully deleted!");
        console.log("Document successfully deleted!");
        this.props.history.push(ROUTES.PIZZA_TABLE)
      }).catch((error) => {
        console.error("Error removing document: ", error);
      });
    }
  };

  render() {
    return (
      <div className="main-panel">
        <div className="content">
          <div className="container-fluid">
            <div className="row">
              <div className="col-md-12">
                <div className="card card-plain">
                  <div className="card-header card-header-primary">
                    <h4 className="card-title mt-0"> Pizza</h4>
                    <p className="card-category"/>
                  </div>
                  <div className="card-body">
                    <div className="table-responsive">
                      <table className="table table-hover">
                        <thead className="">
                        <th/>
                        <th>Name</th>
                        <th>Title</th>
                        <th>Image</th>
                        <th>Price</th>
                        <th/>
                        </thead>
                        {this.state.products.map(board =>
                          <tbody key={board.key}>
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
                            <td>{board.name}</td>
                            <td>{board.title}</td>
                            <td><img width="100px" src={board.url} alt=""/></td>
                            <td>{board.price}</td>
                            <td className="td-actions text-right">
                              <button type="button" rel="tooltip" title="Edit Task"
                                      className="btn btn-primary btn-link btn-sm">
                                <Link to={`/product/edit/${board.key}`} className="material-icons">edit</Link>
                              </button>
                              <button type="submit" onClick={() =>
                              { if (window.confirm('Are you sure you wish to delete "' + board.name + '" ?'))
                                this.handleClick(board.key)}} rel="tooltip" title="Remove"
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
    );
  }
}

// export default TablePizza;

const condition = authUser => !!authUser;

export default compose(
  withAuthorization(condition),
)(TablePizza);
