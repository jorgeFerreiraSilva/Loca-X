/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import { withStyles } from '@material-ui/core/styles';
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
import { DateRangePicker, SingleDatePicker, DayPickerRangeController } from 'react-dates';
import { Link } from 'react-router-dom';
import {
  Paper,
  Typography,
  Grid
} from '@material-ui/core';
import MyButton from '../MyButton';

const styles = theme => ({
  container: {
    width: '100%',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    alignItems: 'flex-start',
    alignContent: 'center'
  },
  box: {
    marginTop: '10%',
    boxShadow: 'none',
    border: '1px solid #e2e2e2'
  },
  boxContent: {
    padding: '10%'
  }
});

function daysBetween(date1, date2) {
  const oneDay = 1000 * 60 * 60 * 24;

  const date1MS = date1.getTime();
  const date2MS = date2.getTime();

  console.log(date1MS, date2MS);

  const difference = Math.abs(date1MS - date2MS);
  console.log(Math.round(difference / oneDay));
  return Math.round(difference / oneDay);
}


class Details extends Component {
  constructor(props) {
    super(props);
    this.state = {
      startDate: null,
      endDate: null,
      focusedInput: null,
      priceperDay: null,
      totalPrice: null
    };
    this.updateState = this.updateState.bind(this);
    this.totalPrice = this.totalPrice.bind(this);
  }
  
  totalPrice(endDate, startDate, priceperDay) {
    const result = Number(daysBetween(endDate, startDate)) * Number(priceperDay);
    return result;
  }
  
  updateState(startDate, endDate) {
    this.setState({ startDate, endDate });
    if (endDate !== null && startDate !== null) {
      const totalPrice = this.totalPrice(endDate._d, startDate._d, this.props.priceperDay);
      console.log(`startDate is ${startDate}, endDate is ${endDate}`);
      this.setState({ totalPrice });
    }
  }

  render() {
    console.log('asjvasdjasvdjasvdavdas');
    console.log(this.state.totalPrice);

    const { classes, productID } = this.props;
    return (
      <MuiThemeProvider>
        <div className={classes.container}>
          <Typography variant="h6" component="h2">
            Diária: R$
            {this.props.priceperDay}
          </Typography>
          <DateRangePicker
            startDate={this.state.startDate}
            startDateId="your_unique_start_date_id"
            endDate={this.state.endDate}
            endDateId="your_unique_end_date_id"
            onDatesChange={({ startDate, endDate }) => this.updateState(startDate, endDate)}
            focusedInput={this.state.focusedInput}
            onFocusChange={focusedInput => this.setState({ focusedInput })}
          />
          {console.log(this.state)}
          <Typography variant="h6" component="h2">
            Total: R$ 
            {this.state.totalPrice}
          </Typography>
          <Link to={
            `/newreservation/${productID}`}
          > PROXIMO
            {/* <MyButton text="CONFIRMAR" /> */}
          </Link>
        </div>
      </MuiThemeProvider>
    );
  }
}

Details.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Details);
