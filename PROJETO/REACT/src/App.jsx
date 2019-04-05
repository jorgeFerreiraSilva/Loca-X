import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import Signup from './auth/Signup';
import Login from './auth/Login';
import Home from './pages/Home';
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
import NavLogged from '../src/components/Navbars/Loggedin.js';
import NavLoggedOut from '../src/components/Navbars/Loggedout.js';
// import Confirmation from './pages/Telaconfirmacao.js/index.js.js.js'; 
import Telaconfirmacao from '../src/pages/Telaconfirmacao';


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
    this.updateUserLog = this.updateUserLog.bind(this);
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

  updateUserLog(obj) {
    this.setState({
      loggedInUser: obj
    });
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
    axios.get(`http://locax.herokuapp.com/api/ads?state=${state}`)
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
    const myNav = (loggedInUser) ? <NavLogged user={loggedInUser}  updateUserLog={this.updateUserLog} /> : <NavLoggedOut />
    if (loggedInUser) {
      return (
        <MuiThemeProvider>
          <div>
            {myNav}
            {/* <hr></hr> */}
            <Switch>
              <Route exact path="/" render={(props) => <Home updateState={this.updateState} updateAds={this.updateAds} {...props} />} />
              <Route path="/entrar" render={() => <Login getUser={this.getTheUser} />} />
              <Route exact path="/itens" render={(props) =>
                <SearchResults {...props} allAdsFiltered={this.state.allAdsFiltered} updateAds={this.updateAds} selectedState={selectedState} />} />
              <ProtectedRoute user={loggedInUser} path="/adicionar" component={AddProduct} />
              <ProtectedRoute user={loggedInUser} path="/novareserva/:id" component={ReservationDetails} />
              <ProtectedRoute user={loggedInUser} exact path="/reservas/dono/" component={ListReservationsOwner} />
              <ProtectedRoute user={loggedInUser} path="/reservas/inq/:id" component={SingleResHirer} />
              <ProtectedRoute user={loggedInUser} exact path="/reservas/inq/" component={ListReservationsHirer} />
              <ProtectedRoute user={loggedInUser} exact path="/reservas/dono/:id" component={SingleResOwner} />
              <Route path="/perfil/:id" render={(props) => <UserProfile {...props} />} />
              <Route path="/cadastrar" render={() => <Signup getUser={this.getTheUser} />} />
              <Route path="/produto/:id" render={(props) => <Product {...props} />} />
{/* <Route path="/novareserva/:id" render={(props) => <ReservationDetails {...props} />} /> */}
              <Route path="/perfil/:id" render={(props) => <UserProfile {...props} />} /> 
              <Route path="/confirmacao" component={Telaconfirmacao} /> 

            </Switch>
          </div>
        </MuiThemeProvider>
      );
    } else {
      return (
        <MuiThemeProvider>
          <div>
            {myNav}
            {/* <hr></hr> */}
            <Switch>
              <Route exact path="/" render={(props) => <Home updateState={this.updateState} updateAds={this.updateAds} {...props} />} />

              <Route path="/itens" render={(props) =>
                <SearchResults {...props} allAdsFiltered={this.state.allAdsFiltered} updateAds={this.updateAds} selectedState={selectedState} />
              } />

              <Route path="/entrar" render={() => <Login getUser={this.getTheUser} />} />
              <Route path="/cadastrar" render={() => <Signup getUser={this.getTheUser} />} />
              <Route path="/produto/:id" render={(props) => <Product {...props} />} />
              <Route path="/perfil/:id" render={(props) => <UserProfile {...props} />} />
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
