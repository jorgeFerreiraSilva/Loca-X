/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';

class ReservationInfo extends Component {
    render() {
      return (
  
      <MuiThemeProvider>
        <div>
          <h1>{this.props.name}</h1>
          <h3>{this.props.description}</h3>
        </div>
      </MuiThemeProvider>
  
      );
    }
  }
  
export default ReservationInfo;
