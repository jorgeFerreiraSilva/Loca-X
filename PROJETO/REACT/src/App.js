import React, { Component } from 'react';
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Header from './components/Header';
import Home from './pages/Home';
import SelectState from './components/SelectState';
import MyCard from './components/MyCard';
import DatePickers from './components/DatePicker';
import Confirmation from './pages/Confirmation';

class App extends Component {
  render() {
    return (

    <MuiThemeProvider>
      <div>
        Hello {this.props.name}
        <DatePickers />
        <MyCard />
      </div>
    </MuiThemeProvider>

    );
  }
}

export default App;
