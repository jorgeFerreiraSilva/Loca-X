import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import { MuiThemeProvider } from 'material-ui/styles';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Home from './pages/Home';
import Confirmation from './pages/Confirmation';
import AddProduct from './pages/AddProduct';
import CategoriesPage from './pages/CategoriesPage';
import Product from './pages/Product';
import SearchResults from './pages/SearchResults';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      
      results: [
        {
          name: 'Lady Gaga',
          price: '10000',
          description: 'Oscar Winner',
          image: 'https://cdn.cliqueinc.com/cache/posts/269360/lady-gaga-malibu-home-269360-1538670263859-main.700x0c.jpg'
        },
        {
          name: 'aaa',
          price: '30',
          description: 'nbbbbb',
          image: 'https://cdn.cliqueinc.com/cache/posts/269360/lady-gaga-malibu-home-269360-1538670263859-main.700x0c.jpg'
        }
      ],
      listDataFromChild: null
    };
  }
  myCallback = (dataFromChild) => {
    this.setState({ listDataFromChild: dataFromChild });
    console.log(dataFromChild);
  }

  render() {
    return (

      <div>
      <MuiThemeProvider>
      <Switch>
          <Route exact path='/' render = {() => <Home callbackFromParent={this.myCallback}/>}/>
          <Route path='/product' component={Product}/>
          <Route exact path='/results' render = {() => <SearchResults results={this.state.results}/>}/>
      </Switch>
    </MuiThemeProvider>
      </div>

    );
  }
}

export default App;
