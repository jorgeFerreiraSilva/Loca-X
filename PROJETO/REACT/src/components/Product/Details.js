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
    width: '40%',
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

  const difference = Math.abs(date1MS - date2MS);

  return Math.round(difference / oneDay);
}

function totalPrice(endDate, startDate, priceperDay) {
  return daysBetween(endDate, startDate) * priceperDay;
}


class Details extends Component {
  constructor(props) {
    super(props);
    this.state = {
      startDate: null,
      endDate: null,
      focusedInput: null
    };
  }

  render() {
    const { classes } = this.props;
    return (
      <MuiThemeProvider>
        <div className={classes.container}>
          <Typography variant="h6" component="h2">
            Diária: R$
            {this.props.price}
          </Typography>
          <DateRangePicker
            startDate={this.state.startDate}
            startDateId="your_unique_start_date_id"
            endDate={this.state.endDate}
            endDateId="your_unique_end_date_id"
            onDatesChange={({ startDate, endDate }) => this.setState({ startDate, endDate })}
            focusedInput={this.state.focusedInput}
            onFocusChange={focusedInput => this.setState({ focusedInput })}
          />
          <Typography variant="h6" component="h2">
            Total:
          </Typography>
          {/* <Link to={`/newreservation/${this.props.productID}`}>
            <MyButton text="CONFIRMAR" />
          </Link> */}
        </div>
      </MuiThemeProvider>
    );
  }
}

Details.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Details);
