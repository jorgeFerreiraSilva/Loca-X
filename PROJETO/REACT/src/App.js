import React, { Component } from 'react';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Header from './components/Header';
import Home from './pages/Home';
import SelectState from './components/SelectState';

class App extends Component {
  render() {
    return (
      <div>
      Hello {this.props.name}
      <Home />
      </div>
    );
  }
}

export default App;
