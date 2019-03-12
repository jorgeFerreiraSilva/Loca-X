/* eslint-disable react/jsx-filename-extension */
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

const styles = theme => ({
  container: {
    width: '80%',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    alignItems: 'flex-start',
    alignContent: 'center',
    backgroundColor: 'white'
  },
  image: {
    width: '90%'
  },
  content: {
    width: '90%'
  }
});

class ProdInfoCard extends Component {
  render() {
    const { classes } = this.props;
    return (
      <MuiThemeProvider>
        <div className={classes.container}>
          <img className={classes.image} src={this.props.image} alt="product"/>
          <div className={classes.content}>
            <Typography variant="h6" component="h2">
              {this.props.name}
            </Typography>
            <hr />
            <Typography component="p">
              {this.props.description}
            </Typography>
          </div>
        </div>
      </MuiThemeProvider>
    );
  }
}

ProdInfoCard.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ProdInfoCard);
