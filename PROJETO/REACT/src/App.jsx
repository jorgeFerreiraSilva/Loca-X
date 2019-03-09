import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import Signup from './auth/Signup';
import Login from './auth/Login';
import Header from './components/Header';
import Home from './pages/Home';
import SelectState from './components/SelectState';
import MyCard from './components/MyCard';
import Confirmation from './pages/Confirmation';
import AddProduct from './pages/AddProduct';
import SearchResults from './pages/SearchResults';
import CategoriesPage from './pages/CategoriesPage';
import Product from './pages/Product';
import ProtectedRoute from './auth/protected-route.jsx';
import AuthService from './auth/auth-service';
import ReservationDetails from './components/ReservationDetails';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedState: 'SP',
      loggedInUser: null
    };
    this.service = new AuthService();
    this.updateState = this.updateState.bind(this);
  }

  fetchUser() {
    const { loggedInUser } = this.state;
    if (loggedInUser === null) {
      this.service.loggedin()
        .then((response) => {
          this.setState({
            loggedInUser: response
          });
        })
        .catch(() => {
          this.setState({
            loggedInUser: false
          });
        });
    }
  }

  getTheUser = (userObj) => {
    this.setState({
      loggedInUser: userObj
    })
  }

  updateState(obj) {
    this.setState({
      selectedState: obj
    });
  }

  render() {
    const { selectedState, loggedInUser } = this.state;
    { this.fetchUser() }

    if (loggedInUser) {
      return (
        <MuiThemeProvider>
          <div>
            <Switch>
              <Route exact path="/" render={() => <Home updateState={this.updateState} />} />
              <Route path="/entrar" render={() => <Login getUser={this.getTheUser} />} />
              <Route exact path="/itens" render={() => <SearchResults selectedState={selectedState} />} />
              <ProtectedRoute user={loggedInUser} path="/adicionar" component={AddProduct} />
              <Route path="/cadastrar" render={() => <Signup getUser={this.getTheUser} />} />
              <Route path="/product/:id" render={(props) => <Product {...props} />} />
              <Route path="/newreservation/:id" render={(props) => <ReservationDetails {...props} />} />
            </Switch>
          </div>
        </MuiThemeProvider>

      );
    } else {
      return (
        <MuiThemeProvider>
          <div>
            <Switch>
              <Route exact path="/" render={() => <Home updateState={this.updateState} />} />
              <Route exact path="/itens" render={() => <SearchResults selectedState={selectedState} />} />
              <Route path="/entrar" render={() => <Login getUser={this.getTheUser} />} />
              <Route path="/cadastrar" render={() => <Signup getUser={this.getTheUser} />} />
              <ProtectedRoute user={loggedInUser} path="/adicionar" component={AddProduct} />
              <Route path="/product/:id" render={(props) => <Product {...props} />} />

            </Switch>
          </div>
        </MuiThemeProvider>

      );
    }
  }
}

export default App;
