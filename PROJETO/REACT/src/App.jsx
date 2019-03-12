import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
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
import axios from 'axios';
import ReservationDetails from './components/ReservationDetails';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedState: 'SP',
      loggedInUser: null,
      allAdsFiltered: null
    };
    this.service = new AuthService();
    this.updateState = this.updateState.bind(this);
    this.updateAds = this.updateAds.bind(this);
    this.searchAdsByState = this.searchAdsByState.bind(this);
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

  updateAds(state) {
    this.searchAdsByState(state);
  }

  searchAdsByState(state) {
    axios.get(`http://localhost:8080/api/ads?state=${state}`)
      .then((response) => {
        console.log('app');
        console.log(response);
        this.setState({ allAdsFiltered: response.data });
      })
      .catch((err) => {
        console.error(err);
      });
  }

  render() {
    const { selectedState, loggedInUser } = this.state;

    console.log('<------------- loggdeInUser --------------->');
    console.log(loggedInUser);
    console.log(selectedState);
    console.log('<------------- loggdeInUser --------------->');

    { this.fetchUser() }
    if (loggedInUser) {
      return (
        <MuiThemeProvider>
          <div>
            <Switch>
              <Route exact path="/" render={() => <Home updateState={this.updateState} updateAds={this.updateAds} />} />
              <Route path="/entrar" render={() => <Login getUser={this.getTheUser} />} />
              <Route exact path="/itens" render={(props) =>
                <SearchResults {...props} allAdsFiltered={this.state.allAdsFiltered} updateAds={this.updateAds} selectedState={selectedState} />} />
              <ProtectedRoute user={loggedInUser} path="/adicionar" component={AddProduct} />
              <Route path="/cadastrar" render={() => <Signup getUser={this.getTheUser} />} />
              <Route path="/product/:id" render={(props) => <Product {...props} filterAdById={this.filterAdById} />} />
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
              <Route exact path="/" render={() => <Home updateState={this.updateState} updateAds={this.updateAds} />} />

              <Route path="/itens" render={(props) =>
                <SearchResults {...props} allAdsFiltered={this.state.allAdsFiltered} updateAds={this.updateAds} selectedState={selectedState} />
              } />

              <Route path="/entrar" render={() => <Login getUser={this.getTheUser} />} />
              <Route path="/cadastrar" render={() => <Signup getUser={this.getTheUser} />} />
              <Route path="/product/:id" render={(props) => <Product {...props} />} />
            </Switch>
          </div>
        </MuiThemeProvider>

      );
    }
  }
}

export default App;
