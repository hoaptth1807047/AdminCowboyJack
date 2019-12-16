import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Navigation from '../Navigation';
import SignUpPage from '../Auth/SignUp';
import SignInPage from '../Auth/SignIn';
import PasswordForgetPage from '../Auth/PasswordForget';
import AccountPage from '../Users/Account';
import HomePage from '../Home';

import UserList  from '../Tables/UserTable/user';

import Show from '../Tables/show';
import TableListPage from '../Tables/table-list';
import DrinkTable from '../Tables/DrinkTable/drinkTable';
import BurgerTable from '../Tables/BurgerTable/burgerTable';
import TablePizza from '../Tables/PizzaTable/pizzaTable';
import OrderTable from '../Tables/OrderTable/order';

import AddCategoryPage from '../Tables/Add/addCategory';
import AddProductPage from '../Tables/Add/addProduct';
import EditProductPage from '../Tables/Edit/editProduct';

import * as ROUTES from '../../constants/routes';
import { withAuthentication } from '../Session';
const App = () => (
  <Router>
    <div>
      <Navigation />
      <Route path={ROUTES.SIGN_UP} component={SignUpPage} />
      <Route exact path={ROUTES.SIGN_IN} component={SignInPage} />
      <Route path={ROUTES.PASSWORD_FORGET} component={PasswordForgetPage}/>
      <Route path={ROUTES.HOME} component={HomePage} />
      <Route path={ROUTES.ACCOUNT} component={AccountPage} />

      <Route path={ROUTES.USER} component={UserList}/>

      <Route path={ROUTES.TABLE_LIST} component={TableListPage} />

      <Route path={ROUTES.PIZZA_TABLE} component={TablePizza}/>
      <Route path={ROUTES.DRINK_TABLE} component={DrinkTable}/>
      <Route path={ROUTES.BURGER_TABLE} component={BurgerTable}/>
      <Route path='/show/:id' component={Show} />
      <Route path='/product/edit/:id' component={EditProductPage} />

      <Route path={ROUTES.ORDER_TABLE} component={OrderTable}/>

      <Route path={ROUTES.ADD_CATEGORY} component={AddCategoryPage}/>
      <Route path={ROUTES.ADD_PRODUCT} component={AddProductPage}/>
    </div>
  </Router>
);

export default withAuthentication(App);
