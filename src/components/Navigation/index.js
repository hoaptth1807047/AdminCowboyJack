import React from 'react';
import { Link } from 'react-router-dom';

import { AuthUserContext } from '../Session';
import SignOutButton from '../Auth/SignOut';
import TablePizza from '../Tables/PizzaTable/pizzaTable';
import * as ROUTES from '../../constants/routes';

const Navigation = () => (
  <AuthUserContext.Consumer>
    {authUser =>
      authUser ? (
        <NavigationAuth authUser={authUser}/>
      ) : (
        <NavigationNonAuth/>
      )
    }
  </AuthUserContext.Consumer>
);

const NavigationAuth = ({ authUser }) => (
  <div>
    <div className="wrapper ">
      <div className="sidebar" data-color="purple" data-background-color="white"
           data-image="../assets/img/sidebar-1.jpg">
        <div className="logo">
          <a href="http://www.creative-tim.com" className="simple-text logo-normal">
            Cowboy Jack
          </a>
        </div>
        <div className="sidebar-wrapper">
          <ul className="nav">
            <li className="nav-item active">
              <Link to={ROUTES.HOME} className="nav-link">
                <i className="material-icons">dashboard</i>
                <p>Dashboard</p>
              </Link>
            </li>
            <li className="nav-item dropdown">
              <a href="#" className="nav-link" id="navbarDropdownTableList" data-toggle="dropdown"
                    aria-haspopup="true" aria-expanded="false">
                <i className="material-icons">add</i>
                <p>Add</p>
              </a>
              <div className="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdownTableList">
                <Link to={ROUTES.ADD_CATEGORY} className="dropdown-item">
                  <i className="fas fa-hamburger"/>
                  <p>Category</p>
                </Link>
                <Link to="add-product" className="dropdown-item">
                  <i className="fas fa-hamburger"/>
                  <p>Product</p>
                </Link>
              </div>
            </li>
            <li className="nav-item dropdown">
              <a href="#" className="nav-link" id="navbarDropdownTableList" data-toggle="dropdown"
                    aria-haspopup="true" aria-expanded="false">
                <i className="material-icons">content_paste</i>
                <p>Product</p>
              </a>
              <div className="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdownTableList">
                <Link to={ROUTES.BURGER_TABLE} className="dropdown-item">
                  <i className="fas fa-hamburger"/>
                  <p>Burger</p>
                </Link>
                <Link to={ROUTES.PIZZA_TABLE} className="dropdown-item">
                  <i className="fas fa-hamburger"/>
                  <p>Pizza</p>
                </Link>
                <Link to={ROUTES.DRINK_TABLE} className="dropdown-item">
                  <i className="fas fa-hamburger"/>
                  <p>Drink</p>
                </Link>
              </div>
            </li>
            <li className="nav-item">
              <Link to={ROUTES.USER} className="nav-link">
                <i className="material-icons">person</i>
                <p>User</p>
              </Link>
            </li>
            <li className="nav-item">
              <Link to={ROUTES.ORDER_TABLE} className="nav-link">
                <i className="material-icons">assignment</i>
                <p>Order</p>
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="main-panel">
        <nav className="navbar navbar-expand-lg navbar-transparent navbar-absolute fixed-top ">
          <div className="container-fluid">
            <div className="navbar-wrapper">
              <a className="navbar-brand" href="#pablo">Dashboard</a>
            </div>
            <button className="navbar-toggler" type="button" data-toggle="collapse" aria-controls="navigation-index"
                    aria-expanded="false" aria-label="Toggle navigation">
              <span className="sr-only">Toggle navigation</span>
              <span className="navbar-toggler-icon icon-bar"/>
              <span className="navbar-toggler-icon icon-bar"/>
              <span className="navbar-toggler-icon icon-bar"/>
            </button>
            <div className="collapse navbar-collapse justify-content-end">
              <form className="navbar-form">
                <div className="input-group no-border">
                  <input type="text" value="" className="form-control" placeholder="Search..."/>
                    <button type="submit" className="btn btn-white btn-round btn-just-icon">
                      <i className="material-icons">search</i>
                      <div className="ripple-container"/>
                    </button>
                </div>
              </form>
              <ul className="navbar-nav">
                <li className="nav-item">
                  <a className="nav-link" href="#">
                    <i className="material-icons">dashboard</i>
                    <p className="d-lg-none d-md-block">
                      Stats
                    </p>
                  </a>
                </li>
                <li className="nav-item dropdown">
                  <a className="nav-link" href="http://example.com" id="navbarDropdownMenuLink" data-toggle="dropdown"
                     aria-haspopup="true" aria-expanded="false">
                    <i className="material-icons">notifications</i>
                    <span className="notification">5</span>
                    <p className="d-lg-none d-md-block">
                      Some Actions
                    </p>
                  </a>
                  <div className="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdownMenuLink">
                    <a className="dropdown-item" href="#">Mike John responded to your email</a>
                    <a className="dropdown-item" href="#">You have 5 new tasks</a>
                    <a className="dropdown-item" href="#">You're now friend with Andrew</a>
                    <a className="dropdown-item" href="#">Another Notification</a>
                    <a className="dropdown-item" href="#">Another One</a>
                  </div>
                </li>
                <li className="nav-item dropdown">
                  <a className="nav-link" href="#" id="navbarDropdownProfile" data-toggle="dropdown"
                     aria-haspopup="true" aria-expanded="false">
                    <i className="material-icons">person</i>
                    <p className="d-lg-none d-md-block">
                      Account
                    </p>
                  </a>
                  <div className="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdownProfile">
                    <a className="dropdown-item" href="#">Profile</a>
                    <a className="dropdown-item" href="#">Settings</a>
                  </div>
                </li>
                <li className="nav-item"><SignOutButton/></li>
              </ul>
            </div>
          </div>
        </nav>
      </div>
    </div>
  </div>
);

const NavigationNonAuth = () => (
  <ul>
  </ul>
);

export default Navigation;
