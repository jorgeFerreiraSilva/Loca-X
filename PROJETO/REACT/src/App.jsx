import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
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
import Product from './pages/Product';
import ProtectedRoute from './auth/protected-route.jsx';
import AuthService from './auth/auth-service';
import ReservationDetails from './pages/ReservationDetails';
import UserProfile from './pages/UserProfile';
import axios from 'axios';
import ListReservationsOwner from './pages/ListReservationsOwner';
import ListReservationsHirer from './pages/ListReservationsHirer';
import SingleResOwner from './pages/SingleResOwner';
import SingleResHirer from './pages/SingleResHirer';


const styles = theme => ({
  typography: {
    fontFamily: "'Poppins', sans-serif",
    fontSize:14,
    textTransform: "none",
    color: "#484848",
  }
});
 


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
    axios.get(`http://192.168.0.41:8080/api/ads?state=${state}`)
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
    console.log('<------------- loggedInUser --------------->');
    console.log(loggedInUser);
    console.log('<------------- loggedInUser --------------->');
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
              <ProtectedRoute user={loggedInUser} path="/newreservation/:id" component={ReservationDetails} />
              <ProtectedRoute user={loggedInUser} exact path="/reservas/dono/" component={ListReservationsOwner} />
              <ProtectedRoute user={loggedInUser} exact path="/reservas/inq/" component={ListReservationsHirer} />
              <ProtectedRoute user={loggedInUser} exact path="/reservas/dono/:id" component={SingleResOwner} />
              <ProtectedRoute user={loggedInUser} exact path="/reservas/inq/:id" component={SingleResHirer} />
              <Route path="/user/:id" render={(props) => <UserProfile {...props} />} />
              <Route path="/cadastrar" render={() => <Signup getUser={this.getTheUser} />} />
              <Route path="/product/:id" render={(props) => <Product {...props} />} />
              <Route path="/newreservation/:id" render={(props) => <ReservationDetails {...props} />} />
              <Route path="/user/:id" render={(props) => <UserProfile {...props} />} />           
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
              <Route path="/user/:id" render={(props) => <UserProfile {...props} />} />
              {/* <Route user={loggedInUser} path="/newreservation/:id" render={(props) => <ReservationDetails {...props} />} /> */}
            </Switch>
          </div>
        </MuiThemeProvider>
      );
    }
  }
}

App.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles, { withTheme: true })(App);
