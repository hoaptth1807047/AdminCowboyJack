import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import storage from '../../Firebase';
import { withFirebase } from '../../Firebase';
import * as ROUTES from '../../../constants/routes';
import * as ROLES from '../../../constants/roles';
import { compose } from 'recompose';
import { withAuthorization } from '../../Session';
import firebase from 'firebase';

const AddProductPage = () => (
  <div>
    <ProductForm/>
  </div>
);

const INITIAL_STATE = {
  name: '',
  title: '',
  price: '',
  url: '',
  category: '',
  categories: [],
  value: '',
};

class ProductFormBase extends Component {
  constructor(props) {
    super(props);
    this.ref = firebase.firestore().collection('products');
    this.state = { ...INITIAL_STATE };
  }

  componentDidMount() {
    this.unsubscribe = firebase.firestore().collection('categories')
      .onSnapshot(snapshot => {
        let categories = [];
        snapshot.forEach(doc =>
          categories.push({ ...doc.data(), key: doc.id }),
        );
        this.setState({
          categories,
        });
      });
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  change = (event) => {
    this.setState({ category: event.target.value });
  };

  handleUpload = (e) => {
    e.preventDefault();
    const { image } = this.state;
    const uploadTask = storage.ref(`images/${image.name}`).put(image);
    uploadTask.on(
      'state_changed',
      snapshot => {
        // progress function ...
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100,
        );
        this.setState({ progress });
      },
      error => {
        // Error function ...
        console.log(error);
      },
      () => {
        // complete function ...
        storage
          .ref('images')
          .child(image.name)
          .getDownloadURL()
          .then(url => {
            this.setState({ url });
            this.onSubmit();
          });
      });
    e.preventDefault();
  };

  handleChange = e => {
    if (e.target.files[0]) {
      const image = e.target.files[0];
      this.setState(() => ({ image }));
    }
  };

  onSubmit = event => {
    const { name, title, price, url, category } = this.state;
    this.ref.add({
      name, title, price, url, category
    }).then(() => {
      this.setState({ ...INITIAL_STATE });
      console.log(category);
      alert("Added successfully!");
      this.props.history.push(ROUTES.HOME);
    }).catch((err) => {
      console.log(err);
    });
  };

  onChange = (e) => {
    const state = this.state;
    state[e.target.name] = e.target.value;
    this.setState(state);
  };

  render() {
    const {
      name, title, price, category, categories,
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
                    <h4 className="card-title">Add Product</h4>
                    <p className="card-category"/>
                  </div>
                  <div className="card-body">
                    <form onSubmit={this.handleUpload}>
                      <div className="row">
                        <div className="col-md-12">
                          <div className="form-group">
                            <div className="row">
                              <div className="col-md-1">
                                <label>Name</label>
                              </div>
                              <div className="col-md-11">
                                <input type="text" name="name" value={name}
                                       onChange={this.onChange} className="form-control"/>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-12">
                          <div className="form-group">
                            <div className="row">
                              <div className="col-md-1">
                                <label>Title</label>
                              </div>
                              <div className="col-md-11">
                                <input type="text" name="title" value={title}
                                       onChange={this.onChange} className="form-control"/>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-12">
                          <div className="row">
                            <div className="col-md-6">
                              <div className="form-group">
                                <div className="row">
                                  <div className="col-md-2">
                                    <label>Price</label>
                                  </div>
                                  <div className="col-md-10">
                                    <input type="number" name="price" value={price}
                                           onChange={this.onChange} className="form-control"/>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="col-md-6">
                              <div className="row">
                                <div className="col-md-2">
                                  <label>Image</label>
                                </div>
                                <div className="col-md-10">
                                  <input type="file" onChange={this.handleChange}/>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-12">
                          <div className="row">
                            <div className="col-md-2">
                              <label className="bmd-label-floating">Category</label>
                            </div>
                            <div className="col-md-6">
                              <select className="form-control" onChange={this.change} value={category}>
                                {categories.map(categories =>
                                  <option key={categories.value} value={categories.value}>{categories.name}</option>,
                                )}
                              </select>
                            </div>
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

const ProductForm = withRouter(withFirebase(ProductFormBase));

export { ProductForm };
const condition = authUser => !!authUser;

export default compose(
  withAuthorization(condition),
)(AddProductPage);
