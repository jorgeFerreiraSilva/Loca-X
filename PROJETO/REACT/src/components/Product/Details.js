/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import { withStyles } from '@material-ui/core/styles';
import {
  Paper,
  Typography,
  Grid
} from '@material-ui/core';
import DatePickers from './DatePicker';
import MyButton from '../MyButton';

const styles = theme => ({
  container: {
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    alignItems: 'flex-start',
    alignContent: 'center'
  },
  image: {
    width: '100%'
  },
  box: {
    marginTop: '10%'
  },
  boxContent: {
    padding: '10%'
  }
});

class Details extends Component {
    render() {
      const { classes } = this.props;
      return (
  
      <MuiThemeProvider>
        <Paper square className={classes.box}>
        <div className={classes.boxContent}>
          <h3>Diária: R${this.props.price}</h3>
          <DatePickers />
          <DatePickers />
          <h3>Total:</h3>
          <MyButton text="CONFIRM"/>
        </div>
        </Paper>
      </MuiThemeProvider>
  
      );
    }
  }
  
  Details.propTypes = {
    classes: PropTypes.object.isRequired
  };
  
  export default withStyles(styles)(Details);
