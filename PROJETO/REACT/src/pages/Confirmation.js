/* eslint-disable react/prefer-stateless-function */
/* eslint-disable react/jsx-filename-extension */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

const styles = theme => ({
  root: {
    flexGrow: 1
  },
  paper: {
    padding: theme.spacing.unit * 2,
    margin: '20%',
    textAlign: 'center',
    color: theme.palette.text.secondary
  }
});

class Confirmation extends Component {
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <Grid container wrap="nowrap" spacing={24}>
          <Grid item xs={12}>
            <Paper className={classes.paper}>
              <img src="https://cdn3.iconfinder.com/data/icons/flat-actions-icons-9/792/Tick_Mark_Dark-512.png" alt="check-icon" />
            </Paper>
          </Grid>
        </Grid>
      </div>
    );
  }
}

Confirmation.propTypes = {
  classes: PropTypes.object.isRequired
};
export default withStyles(styles)(Confirmation);
