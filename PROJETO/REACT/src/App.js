import React, { Component } from 'react';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Header from './components/Header';

class App extends Component {
  render() {
    return (
      <div>
      <Header />
      <Login />
      Hello {this.props.name}
      </div>
    );
  }
}

export default App;
