/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import DatePickers from './DatePicker';
import MyButton from '../MyButton';

class ProdPageInfo extends Component {
    render() {
      return (
  
      <MuiThemeProvider>
        <div>
          <h3>Diária: R${this.props.price}</h3>
          <DatePickers />
          <DatePickers />
          <h3>Total:</h3>
          <MyButton text="CONFIRM"/>
        </div>
      </MuiThemeProvider>
  
      );
    }
  }
  
export default ProdPageInfo;
