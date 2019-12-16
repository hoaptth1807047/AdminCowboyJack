import React from 'react';
import firebase from 'firebase';
import * as ROUTES from '../../../constants/routes';
import { compose } from 'recompose';
import { withAuthorization } from '../../Session';
import storage from '../../Firebase';

class EditProductPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      key: '',
      loading: false,
      name: '',
      title: '',
      url: '',
      price: '',
      category: '',
      categories: [],
    };
  }

  componentDidMount() {
    this.setState({ loading: true });
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
    const productRef = firebase.firestore().collection('products').doc(this.props.match.params.id);
    productRef.get().then(doc => {
      if (doc.exists) {
        const product = doc.data();
        this.setState({
          loading: true,
          key: doc.id,
          name: product.name,
          title: product.title,
          url: product.url,
          price: product.price,
          category: product.category,
        });
      } else {
        console.log('No such document!');
      }
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
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100,
        );
        this.setState({ progress });
      },
      error => {
        console.log(error);
      },
      () => {
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

  onSubmit = e => {
    const { name, title, url, price, category } = this.state;
    const updateRef = firebase.firestore().collection('products').doc(this.state.key);
    updateRef.set({
      name,
      title,
      url,
      price,
      category
    }).then(() => {
      this.setState({
        name: '',
        title: '',
        url: '',
        price: '',
        roles: ''
      });
      alert('Updated Success!');
      this.props.history.push(ROUTES.BURGER_TABLE);
    }).catch((error) => {
      console.error('Error adding document: ', error);
    });
  };

  onChange = e => {
    const state = this.state;
    state[e.target.name] = e.target.value;
    this.setState({ product: state });
  };

  render() {
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
                                <input type="text" name="name" value={this.state.name}
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
                                <input type="text" name="title" value={this.state.title}
                                       onChange={this.onChange} className="form-control"/>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="row">
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
                        <div className="col-md-6">
                          <div className="form-group">
                            <div className="row">
                              <div className="col-md-2">
                                <label>Price</label>
                              </div>
                              <div className="col-md-10">
                                <input type="number" name="price" value={this.state.price}
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
                              <div className="col-md-2">
                                <label>Category</label>
                              </div>
                              <div className="col-md-10">
                                <select className="form-control" onChange={this.change} value={this.state.category}>
                                  {this.state.categories.map(categories =>
                                    <option key={categories.value} value={categories.value}>{categories.name}</option>,
                                  )}
                                </select>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <button type="submit" className="btn btn-primary pull-right">Update</button>
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

const condition = authUser => !!authUser;

export default compose(
  withAuthorization(condition),
)(EditProductPage);