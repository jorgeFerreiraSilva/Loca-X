import React, { Component } from 'react';
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Header from './components/Header';
import Home from './pages/Home';
import SelectState from './components/SelectState';
import MyCard from './components/MyCard';
import Confirmation from './pages/Confirmation';
import AddProduct from './pages/AddProduct';
import CategoriesPage from './pages/CategoriesPage';
import Product from './pages/Product';

class App extends Component {
  render() {
    return (

    <MuiThemeProvider>
      <div>
        {/* Hello {this.props.name}
        <MyCard name="Lady Gaga" description="Oscar winner" price="10" image="https://cdn.cliqueinc.com/cache/posts/269360/lady-gaga-malibu-home-269360-1538670263859-main.700x0c.jpg"/>
        <ProdPageInfo name="tv" price="10"/> */}
        {/* <Signup /> */}
        {/* <Login /> */}
      </div>
    </MuiThemeProvider>

    );
  }
}

export default App;
