import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Header from './components/Header';
import Home from './pages/Home';
import SelectState from './components/SelectState';
import MyCard from './components/MyCard';
import Confirmation from './pages/Confirmation';
import AddProduct from './pages/AddProduct';
import SearchResults from './pages/SearchResults';
import CategoriesPage from './pages/CategoriesPage';
import Product from './pages/Product';

class App extends Component {
  constructor() {
    super();
    this.state = {
      selectedState: 'SP'
    };
    this.updateState = this.updateState.bind(this);
  }

  updateState(obj) {
    this.setState({
      selectedState: obj
    });
  }

  render() {
    const { selectedState } = this.state;

    return (
      <MuiThemeProvider>
        <div>
          <Switch>

            <Route exact path="/" render={() => <Home updateState={this.updateState} />} />
            <Route path="/itens" render={() => <SearchResults selectedState={selectedState} />} />
            <Route path="/add" render={() => <AddProduct />} />
          </Switch>
        </div>
      </MuiThemeProvider>

    );
  }
}

export default App;
